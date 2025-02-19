package com.project.CollegeManagement.service.impl;

import com.project.CollegeManagement.entity.AssignmentSubmission;
import com.project.CollegeManagement.repository.IAssignmentSubmissionRepository;
import com.project.CollegeManagement.service.IAssignmentSubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignmentSubmissionService implements IAssignmentSubmissionService
{
    @Autowired
    private IAssignmentSubmissionRepository repository;

    @Override
    public void addAssignmentSubmission(AssignmentSubmission assignmentSubmission) {
        repository.save(assignmentSubmission);
    }

    @Override
    public AssignmentSubmission getAssignmentSubmissionById(Long submissionId) {
        return repository.findById(submissionId).get();
    }

    @Override
    public List<AssignmentSubmission> getAllAssignmentSubmissions() {
        return repository.findAll();
    }

    @Override
    public List<AssignmentSubmission> getAssignmentSubmissionByAssignmentId(Long id) {
        return repository.findByAssignmentId(id);
    }

    @Override
    public List<AssignmentSubmission> getAssignmentSubmissionsByStudentId(Long studentId) {
        return repository.findByStudentId(studentId);
    }

    @Override
    public void updateAssignmentSubmission(AssignmentSubmission assignmentSubmission) {
        repository.save(assignmentSubmission);
    }

    @Override
    public void deleteAssignmentSubmissionById(Long id) {
        repository.deleteById(id);
    }
}
