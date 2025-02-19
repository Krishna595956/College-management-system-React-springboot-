package com.project.CollegeManagement.service;

import com.project.CollegeManagement.entity.Assignment;

import java.util.List;

public interface IAssignmentService
{
    void addAssignment(Assignment assignment);

    List<Assignment> getAllAssignments();

    List<Assignment> getAssignmentsByTeacherId(Long teacherId);

    List<Assignment> getAssignmentByDepartment(String department);
    void deleteAssignmentById(Long assignmentId);

    Assignment getAssignmentById(Long assignmentId);
}
