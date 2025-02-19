package com.project.CollegeManagement.controller;

import com.project.CollegeManagement.dto.AssignmentDto;
import com.project.CollegeManagement.entity.Assignment;
import com.project.CollegeManagement.entity.User;
import com.project.CollegeManagement.service.IAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/college")
public class AssignmentController
{
    @Autowired
    private IAssignmentService assignmentService;

    @PostMapping("/add/assignment")
    @PreAuthorize("hasAuthority('Teacher')")  // Ensure only teachers can add assignments
    public ResponseEntity<?> addAssignment(@ModelAttribute AssignmentDto assignmentDto) {
        HashMap<String, Object> res = new HashMap<>();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User teacher = (User) authentication.getPrincipal();

        MultipartFile file = assignmentDto.getPdfFile();

        if (file.isEmpty() || !file.getOriginalFilename().endsWith(".pdf")) {
            res.put("success", false);
            res.put("msg", "Invalid file type. Only PDF files are allowed.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }

        try {
            String filepath = Paths.get("").toAbsolutePath().toString();
            Path path = Paths.get(filepath, "src", "main", "resources", "static", "documents", file.getOriginalFilename());
            Path directory = Paths.get(filepath, "src", "main", "resources", "static", "documents");
            if (!Files.exists(directory)) {
                Files.createDirectories(directory);
            }
            file.transferTo(path);

            Assignment assignment = Assignment.builder()
                    .title(assignmentDto.getTitle())
                    .description(assignmentDto.getDescription())
                    .assignmentType(assignmentDto.getAssignmentType())
                    .dueDate(assignmentDto.getDueDate())
                    .teacher(teacher)
                    .pdfFile(file.getOriginalFilename())
                    .build();

            assignmentService.addAssignment(assignment);

            res.put("success", true);
            res.put("msg", "Assignment added successfully.");
            return ResponseEntity.status(HttpStatus.OK).body(res);

        }
        catch (IOException e) {
            res.put("success", false);
            res.put("msg", "Failed to save the images. Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
        catch (Exception e) {
            res.put("success", false);
            res.put("msg", "Failed to add the assignment. Error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/get/assignments/all")
    public ResponseEntity<?> getAllAssignments()
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<Assignment> assignments = assignmentService.getAllAssignments();
            res.put("success",true);
            res.put("assignments",assignments);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to fetch the assignments");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/get/all/departments")
    public ResponseEntity<?> getAllAssignmentsForDepartment(@RequestParam String department)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<Assignment> assignments = assignmentService.getAssignmentByDepartment(department);
            res.put("success",true);
            res.put("assignments",assignments);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to fetch the assignments for departments"+department);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @DeleteMapping("/delete/assignment/{id}")
    public ResponseEntity<?> deleteAssignmentById(@PathVariable Long id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            assignmentService.deleteAssignmentById(id);
            res.put("success",true);
            res.put("msg","Assignment Deleted Successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Assignment is not found for provided id is"+id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }
}
