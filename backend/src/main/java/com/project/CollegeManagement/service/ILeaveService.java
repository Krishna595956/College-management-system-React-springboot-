package com.project.CollegeManagement.service;

import com.project.CollegeManagement.entity.LeaveApplication;

import java.util.List;

public interface ILeaveService
{
    void addLeave(LeaveApplication leave);

    List<LeaveApplication> getAllLeaves();

    LeaveApplication getLeaveById(Long id);

    void updateLeave(LeaveApplication leave);

    void deleteLeave(Long id);
}
