package com.project.CollegeManagement.service.impl;

import com.project.CollegeManagement.entity.Assignment;
import com.project.CollegeManagement.repository.IAssignmentRepository;
import com.project.CollegeManagement.service.IAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignmentService implements IAssignmentService
{
    @Autowired
    private IAssignmentRepository repository;

    @Override
    public void addAssignment(Assignment assignment) {
        repository.save(assignment);
    }

    @Override
    public List<Assignment> getAllAssignments() {
        return repository.findAll();
    }

    @Override
    public List<Assignment> getAssignmentsByTeacherId(Long teacherId) {
        return repository.findByTeacherId(teacherId);
    }

    @Override
    public List<Assignment> getAssignmentByDepartment(String department) {
        return repository.findByDepartment(department);
    }

    @Override
    public void deleteAssignmentById(Long assignmentId) {
        repository.deleteById(assignmentId);
    }

    @Override
    public Assignment getAssignmentById(Long assignmentId) {
        return repository.findById(assignmentId).get();
    }
}
