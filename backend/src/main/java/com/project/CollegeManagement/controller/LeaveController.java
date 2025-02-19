package com.project.CollegeManagement.controller;

import com.project.CollegeManagement.entity.LeaveApplication;
import com.project.CollegeManagement.entity.User;
import com.project.CollegeManagement.service.ILeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/college")
public class LeaveController
{
    @Autowired
    private ILeaveService service;

    @PostMapping("/apply/leave/{studentId}")
    @PreAuthorize("hasAuthority('Student')")  // Only students can apply for leave
    public ResponseEntity<?> studentApplyLeave(@PathVariable Long studentId,
                                               @RequestBody LeaveApplication leaveApplication) {
        HashMap<String, Object> res = new HashMap<>();

        try {
            leaveApplication.setStudentId(studentId);
            if (leaveApplication.getStartDate().isAfter(leaveApplication.getEndDate())) {
                res.put("success", false);
                res.put("err", "End date cannot be before start date.");
                return ResponseEntity.badRequest().body(res);
            }
            leaveApplication.setStatus("Pending");  // Set the initial status to "Pending"
            service.addLeave(leaveApplication);  // Save the leave application

            res.put("success", true);
            res.put("msg", "Leave applied successfully");
            res.put("leaveId", leaveApplication.getId());  // Return the leave ID
            return ResponseEntity.status(200).body(res);

        } catch (Exception e) {
            res.put("success", false);
            res.put("err", "Failed to apply for leave: " + e.getMessage());
            return ResponseEntity.status(500).body(res);
        }
    }

    @GetMapping("/all/leave")
    public ResponseEntity<?> getAllLeaves()
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<LeaveApplication> leaves = service.getAllLeaves();
            res.put("success",true);
            res.put("leaves",leaves);
            return ResponseEntity.status(200).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to fetch the all leaves");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @PutMapping("/update/leave/status/{leaveId}")
    public ResponseEntity<?> updateLeave(@PathVariable Long leaveId,@RequestParam String status)
    {
        HashMap<String,Object> res = new HashMap<>();
        LeaveApplication leave = service.getLeaveById(leaveId);
        if (leave == null)
        {
            res.put("success",false);
            res.put("err","Leave is not found for provided id is"+leaveId);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
        try
        {
            leave.setStatus(status);
            service.addLeave(leave);
            res.put("success",true);
            res.put("msg","Leave status updated successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to update the leave");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @DeleteMapping("/delete/leave/{leaveId}")
    public ResponseEntity<?> deleteLeave(@PathVariable Long leaveId)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            service.deleteLeave(leaveId);
            res.put("success",true);
            res.put("msg","Leave deleted successfully");
            return ResponseEntity.status(200).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to delete the leave for provided id is "+leaveId);
            return ResponseEntity.status(404).body(res);
        }
    }
}
