package com.project.CollegeManagement.controller;

import com.project.CollegeManagement.entity.Feedback;
import com.project.CollegeManagement.entity.User;
import com.project.CollegeManagement.service.IFeedbackService;
import com.project.CollegeManagement.service.IUserService;
import org.apache.xmlbeans.impl.xb.xsdschema.Attribute;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/college")
public class FeedbackController
{
    @Autowired
    private IFeedbackService service;

    @Autowired
    private IUserService userService;

    @PostMapping("/add/feedbacks/{teacherId}")
    @PreAuthorize("hasAuthority('Student')")
    public ResponseEntity<?> addFeedback(@PathVariable Long teacherId,
                                         @RequestBody Feedback feedback) {
        HashMap<String, Object> res = new HashMap<>();

        // Fetch teacher by ID
        User teacher = userService.getUserById(teacherId);
        if (teacher == null) {
            res.put("success", false);
            res.put("err", "Teacher not found for provided ID: " + teacherId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }

        // Get the currently authenticated student
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User student = (User) authentication.getPrincipal();

        try {
            // Set teacher and student details to the feedback
            feedback.setTeacherId(teacherId);  // Setting teacherId manually
            feedback.setStudentId(student.getId());  // Setting studentId manually
            feedback.setDateTime(LocalDateTime.now());  // Set current timestamp for the feedback

            // Save the feedback using the service layer
            service.addFeedbacks(feedback);  // Ensure this method is correctly saving the feedback

            res.put("success", true);
            res.put("msg", "Feedback added successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            res.put("success", false);
            res.put("err", "Failed to add feedback: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }


    @GetMapping("/get/all/feedbacks")
    public ResponseEntity<?> getAllFeedbacks()
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<Feedback> feedbacks = service.getAllFeedbacks();
            res.put("success",true);
            res.put("feedbacks",feedbacks);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to fetch the feedbacks");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/get/feedbacks/teacher")
    public ResponseEntity<?> getFeedbackByTeacher()
    {
        HashMap<String,Object> res = new HashMap<>();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        try
        {
            List<Feedback> feedbacks = service.getTeacherFeedbacks(user.getId());
            res.put("success",true);
            res.put("feedbacks",feedbacks);
            return ResponseEntity.status(200).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to fetch the feedbacks for provided teacher id is"+user.getId());
            return ResponseEntity.status(404).body(res);
        }
    }

    @DeleteMapping("/delete/feedback/{feedbackId}")
    public ResponseEntity<?> deleteFeedbackById(@PathVariable Long feedbackId)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            service.deleteFeedbackById(feedbackId);
            res.put("success",true);
            res.put("msg","Feedback deleted successfully");
            return ResponseEntity.status(200).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","Failed to delete the feedback for provided id is"+feedbackId);
            return ResponseEntity.status(404).body(res);
        }
    }
}
