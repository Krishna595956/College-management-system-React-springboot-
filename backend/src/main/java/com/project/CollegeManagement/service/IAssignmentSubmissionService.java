package com.project.CollegeManagement.service;

import com.project.CollegeManagement.entity.AssignmentSubmission;

import java.util.List;

public interface IAssignmentSubmissionService
{
    void addAssignmentSubmission(AssignmentSubmission assignmentSubmission);

    AssignmentSubmission getAssignmentSubmissionById(Long submissionId);

    List<AssignmentSubmission> getAllAssignmentSubmissions();

    List<AssignmentSubmission> getAssignmentSubmissionByAssignmentId(Long id);

    List<AssignmentSubmission> getAssignmentSubmissionsByStudentId(Long studentId);

    void updateAssignmentSubmission(AssignmentSubmission assignmentSubmission);

    void deleteAssignmentSubmissionById(Long id);
}
