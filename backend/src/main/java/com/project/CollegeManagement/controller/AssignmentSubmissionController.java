package com.project.CollegeManagement.controller;

import com.project.CollegeManagement.dto.SubmissionDto;
import com.project.CollegeManagement.entity.Assignment;
import com.project.CollegeManagement.entity.AssignmentSubmission;
import com.project.CollegeManagement.entity.Backlog;
import com.project.CollegeManagement.entity.User;
import com.project.CollegeManagement.service.IAssignmentSubmissionService;
import com.project.CollegeManagement.service.IAssignmentService;
import com.project.CollegeManagement.service.IBacklogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/college")
public class AssignmentSubmissionController
{
    @Autowired
    private IAssignmentSubmissionService service;

    @Autowired
    private IAssignmentService assignmentService;

    @Autowired
    private IBacklogService backlogService;

    @PostMapping("/submit/student/assignments/{assignmentId}")
    public ResponseEntity<?> submitAssignment(@PathVariable Long assignmentId,
                                              @ModelAttribute SubmissionDto submissionDto)
    {
        HashMap<String,Object> res = new HashMap<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User student = (User)authentication.getPrincipal();

        Assignment assignment = assignmentService.getAssignmentById(assignmentId);
        if (assignment == null)
        {
            res.put("success",false);
            res.put("err","Failed to fetch the assignment for provided id is"+assignmentId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
        try
        {
            String filepath = Paths.get("").toAbsolutePath().toString();
            Path path = Paths.get(filepath,"src", "main", "resources", "static", "documents",submissionDto.getPdfFile().getOriginalFilename());
            String fileUrl = submissionDto.getPdfFile().getOriginalFilename();
            submissionDto.getPdfFile().transferTo(path);

            AssignmentSubmission submission = AssignmentSubmission.builder()
                    .submissionDate(LocalDate.now())
                    .assignment(assignment)
                    .student(student)
                    .pdfFile(fileUrl)
                    .build();

            service.addAssignmentSubmission(submission);
            res.put("success",true);
            res.put("msg","Submission Submitted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);

        } catch (IOException e)
        {
            res.put("success",false);
            res.put("err","Failed to submit your submission");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/get/all/submissions")
    public ResponseEntity<?> getAllSubmissions()
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<AssignmentSubmission> submissions = service.getAllAssignmentSubmissions();
            res.put("success",true);
            res.put("submissions",submissions);
            return ResponseEntity.status(200).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to fetch the submissions");
            return ResponseEntity.status(500).body(res);
        }
    }

    @GetMapping("/get/submissions/{assignmentId}")
    public ResponseEntity<?> getSubmissionByAssignmentId(@PathVariable Long assignmentId)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<AssignmentSubmission> submissions = service.getAssignmentSubmissionByAssignmentId(assignmentId);
            res.put("success",true);
            res.put("submissions",submissions);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to fetch the assignments for provided assignment id is"+assignmentId);
            return ResponseEntity.status(404).body(res);
        }
    }

    @GetMapping("/get/his/submissions")
    public ResponseEntity<?> getSubmissionByStudentId()
    {
        HashMap<String,Object> res = new HashMap<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User student = (User)authentication.getPrincipal();
        try
        {
            List<AssignmentSubmission> submissions = service.getAssignmentSubmissionsByStudentId(student.getId());
            res.put("success",true);
            res.put("submissions",submissions);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to fetch the assignments for provided student id is"+ student.getId());
            return ResponseEntity.status(404).body(res);
        }
    }

    @DeleteMapping("/delete/submissions/{submissionId}")
    public ResponseEntity<?> deleteAssignmentSubmissionById(@PathVariable Long submissionId)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            service.deleteAssignmentSubmissionById(submissionId);
            res.put("success",true);
            res.put("msg","Assignment Submission deleted successfully");
            return ResponseEntity.status(200).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to delete the assignment submission for provided id is"+submissionId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }

    @PutMapping("/update/evaluate/assignmentSubmission/{submissionId}")
    public ResponseEntity<?> updateSubmissionAssignment(@PathVariable Long submissionId,
                                                        @RequestParam String grade){
        HashMap<String,Object> res = new HashMap<>();
        AssignmentSubmission submission = service.getAssignmentSubmissionById(submissionId);
        if (submission == null)
        {
            res.put("success",false);
            res.put("err","Failed to fetch the submission for provided is is"+submissionId);
            return ResponseEntity.status(404).body(res);
        }

        try
        {
            submission.setEvaluated(true);
            submission.setGrade(grade);

            if ("F".equalsIgnoreCase(grade)) {
                Backlog backlog = new Backlog();
                backlog.setGrade(grade);
                backlog.setSubjectName(submission.getAssignment().getTitle());
                backlog.setStudent(submission.getStudent());
                backlogService.addBacklogs(backlog);
            }
            service.addAssignmentSubmission(submission);

            res.put("success",true);
            res.put("msg","Assignment Evaluated successfully");
            return ResponseEntity.status(200).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Assignment Evaluation Failed");
            return ResponseEntity.status(500).body(res);
        }
    }


    @GetMapping("/student/get/his/backlogs")
    @PreAuthorize("hasAuthority('Student')")
    public ResponseEntity<?> getStudentBacklogs()
    {
        HashMap<String,Object> res = new HashMap<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User student = (User)authentication.getPrincipal();
        try
        {
            List<Backlog> backlogs = backlogService.getBacklogsByStudentId(student.getId());
            res.put("success",true);
            res.put("backlogs",backlogs);
            return ResponseEntity.ok(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("msg","No Backlogs found for provided student id is"+student.getId());
            return ResponseEntity.status(404).body(res);
        }
    }

}
