package com.project.CollegeManagement.controller;

import com.project.CollegeManagement.entity.Attendance;
import com.project.CollegeManagement.entity.User;
import com.project.CollegeManagement.service.IAttendanceService;
import com.project.CollegeManagement.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/college")
public class AttendanceController
{
    private final IAttendanceService attendanceService;
    private final IUserService userService;

    @Autowired
    public AttendanceController(IAttendanceService attendanceService, IUserService userService) {
        this.attendanceService = attendanceService;
        this.userService = userService;
    }

    @PostMapping("/mark/{studentId}")
    @PreAuthorize("hasAuthority('Teacher')")
    public ResponseEntity<?> markAttendance(@PathVariable Long studentId,
                                            @RequestParam(required = true) Boolean present) {
        Map<String, Object> response = new HashMap<>();

        // 1. Validate Student ID
        User student = userService.getUserById(studentId);
        if (student == null) {
            response.put("success", false);
            response.put("err", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        // 2. Validate Present Status
        if (present == null) {
            response.put("success", false);
            response.put("err", "Present status is required");
            return ResponseEntity.badRequest().body(response);
        }

        // 3. Create Attendance Object
        Attendance attendance = new Attendance();
        attendance.setStudent(student);
        attendance.setDate(LocalDate.now());
        attendance.setPresent(present); // Add present status to the object

        // 4. Mark Attendance
        try {
            attendanceService.markAttendance(attendance);
            response.put("success", true);
            response.put("msg", "Attendance marked successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("err", "Failed to mark attendance: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/student/get/his/attendance")
    @PreAuthorize("hasAuthority('Student')")
    public ResponseEntity<?> getAttendanceForStudent() {
        HashMap<String, Object> response = new HashMap<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        try {
            List<Attendance> attendanceList = attendanceService.getAttendanceByStudent(user.getId());
            response.put("success", true);
            response.put("attendance", attendanceList);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("err", "Failed to fetch attendance: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

//    @GetMapping("/class/{classId}/date/{date}")
//    @PreAuthorize("hasAuthority('Admin') or hasAuthority('Teacher')")
//    public ResponseEntity<?> getAttendanceForClassOnDate(@PathVariable Long classId, @PathVariable String date) {
//        HashMap<String, Object> response = new HashMap<>();
//        try {
//            LocalDate localDate = LocalDate.parse(date);
//            List<Attendance> attendanceList = attendanceService.getAttendanceByClassAndDate(classId, localDate);
//            response.put("success", true);
//            response.put("attendance", attendanceList);
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            response.put("success", false);
//            response.put("err", "Failed to fetch attendance for the class on the given date: " + e.getMessage());
//            return ResponseEntity.status(500).body(response);
//        }
//    }
}
