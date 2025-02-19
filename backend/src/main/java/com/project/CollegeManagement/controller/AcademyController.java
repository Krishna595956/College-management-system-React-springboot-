package com.project.CollegeManagement.controller;

import com.project.CollegeManagement.entity.Academy;
import com.project.CollegeManagement.entity.Course;
import com.project.CollegeManagement.entity.User;
import com.project.CollegeManagement.service.IAcademyService;
import com.project.CollegeManagement.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/college")
public class AcademyController
{

    @Autowired
    private IAcademyService academyService;
    @Autowired
    private IUserService userService;

    @GetMapping("/get/academics")
    public List<Academy> getAllAcademies() {
        return academyService.getAllAcademies();
    }

    @GetMapping("/{id}")
    public Optional<Academy> getAcademyById(@PathVariable Long id) {
        return academyService.getAcademyById(id);
    }

    @PostMapping("/academy/add/{instructorId}")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<?> createAcademy(@PathVariable Long instructorId,
                                           @RequestBody Academy academy) {
        HashMap<String, Object> res = new HashMap<>();

        User user = userService.getUserById(instructorId);
        if (user == null) {
            res.put("success", false);
            res.put("err", "Failed to find the user with the provided ID: " + instructorId);
            return ResponseEntity.status(404).body(res);
        }

        if (!"Teacher".equals(user.getRole())) {
            res.put("success", false);
            res.put("err", "The user with ID " + instructorId + " is not a teacher.");
            return ResponseEntity.status(400).body(res);
        }

        try {
            academy.setInstructorId(instructorId);
            academyService.createAcademy(academy);
            res.put("success", true);
            res.put("msg", "Academy added successfully");
            return ResponseEntity.status(200).body(res);
        } catch (Exception e) {
            res.put("success", false);
            res.put("err", "Failed to add the academy: " + e.getMessage());
            return ResponseEntity.status(500).body(res);
        }
    }

    @PostMapping("/{academyId}/courses")
    @PreAuthorize("hasAuthority('Teacher')")
    public Course createCourse(@PathVariable Long academyId, @RequestBody Course course)
    {
        academyService.linkCourseToAcademy(academyId, course.getId());
        return academyService.createCourse(course);
    }

    @PutMapping("/{academyId}/courses/{courseId}")
    public void linkCourseToAcademy(@PathVariable Long academyId, @PathVariable Long courseId) {
        academyService.linkCourseToAcademy(academyId, courseId);
    }
}

