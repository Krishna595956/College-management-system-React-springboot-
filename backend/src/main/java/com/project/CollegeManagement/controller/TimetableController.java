package com.project.CollegeManagement.controller;

import com.project.CollegeManagement.dto.TimetableDto;
import com.project.CollegeManagement.entity.Timetable;
import com.project.CollegeManagement.entity.User;
import com.project.CollegeManagement.service.ITimetableService;
import com.project.CollegeManagement.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/college")
public class TimetableController {

    @Autowired
    private ITimetableService timetableService;

    @Autowired
    private IUserService userService;

    @PostMapping("/add/timetables")
    @PreAuthorize("hasAuthority('Teacher')")
    public ResponseEntity<?> createTimetable(@ModelAttribute TimetableDto timetable)
    {
        HashMap<String,Object> res = new HashMap<>();
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User teacher = (User) authentication.getPrincipal();

            List<User> students = userService.getStudentsByIds(timetable.getStudentId());
            if (students.isEmpty())
            {
                res.put("success", false);
                res.put("err", "No valid students found for the given IDs");
                return ResponseEntity.status(400).body(res);
            }
            Timetable timetable1 = Timetable.builder()
                    .dayOfWeek(timetable.getDayOfWeek())
                    .startTime(timetable.getStartTime())
                    .endTime(timetable.getEndTime())
                    .subject(timetable.getSubject())
                    .location(timetable.getLocation())
                    .teacher(teacher)
                    .students(students)
                    .date(LocalDateTime.now())
                    .status(timetable.getStatus())
                    .build();

            timetableService.createTimetable(timetable1);
            res.put("success",true);
            res.put("msg","Time Table Created Successfully");
            return ResponseEntity.ok(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to add the time tables");
            return ResponseEntity.status(500).body(res);
        }
    }

    @PutMapping("/update/timetables/{id}")
    public ResponseEntity<Timetable> updateTimetable(@PathVariable Long id, @RequestBody Timetable timetable) {
        Timetable updatedTimetable = timetableService.updateTimetable(id, timetable);
        return ResponseEntity.ok(updatedTimetable);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTimetable(@PathVariable Long id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            timetableService.deleteTimetable(id);
            res.put("success",true);
            res.put("msg","Time Table Deleted Successfully");
            return ResponseEntity.ok(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Time Table is not found for provided id is"+id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @GetMapping("/get/all/timetables")
    public ResponseEntity<?> getAllTimetables()
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<Timetable> timetables = timetableService.getAllTimetables();
            res.put("success",true);
            res.put("timetables",timetables);
            return ResponseEntity.ok(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to fetch the timetables");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }

    }

    @GetMapping("/day/{dayOfWeek}")
    public ResponseEntity<?> getTimetableByDay(@PathVariable String dayOfWeek)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<Timetable> timetables = timetableService.getTimetableByDay(dayOfWeek);
            res.put("success",true);
            res.put("timetables",timetables);
            return ResponseEntity.ok(res);
        }
        catch (Exception e)
        {
            res.put("success", false);
            res.put("err","Failed to fetch the time tables for dayOfWeek is"+dayOfWeek);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }

    }

    @GetMapping("/get/teacher/{teacherId}")
    @PreAuthorize("hasAuthority('Teacher')")
    public ResponseEntity<?> getTimetableByTeacher()
    {
        HashMap<String,Object> res = new HashMap<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User teacher = (User)authentication.getPrincipal();
        try {
            List<Timetable> timetables = timetableService.getTimetableByTeacher(teacher.getId());
            res.put("success",true);
            res.put("timetables",timetables);
            return ResponseEntity.ok(timetables);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to fetch the timetables for provided teacher"+teacher.getId());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @GetMapping("/student-group/studentId")
    public ResponseEntity<?> getTimetableByStudentGroup(@PathVariable Long studentGroupId)
    {
        HashMap<String,Object> res = new HashMap<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User student = (User) authentication.getPrincipal();
        try
        {
            List<Timetable> timetables = timetableService.getTimetableByStudentId(student.getId());
            res.put("success",true);
            res.put("timetables",timetables);
            return ResponseEntity.ok(timetables);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to fetch the time table for provided student id is"+studentGroupId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }

    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<Timetable>> getTimetableByDate(@PathVariable LocalDateTime date) {
        List<Timetable> timetables = timetableService.getTimetableByDate(date);
        return ResponseEntity.ok(timetables);
    }
}

