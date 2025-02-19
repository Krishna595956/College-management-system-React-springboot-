package com.project.CollegeManagement.service.impl;

import com.project.CollegeManagement.entity.LeaveApplication;
import com.project.CollegeManagement.repository.ILeaveRepository;
import com.project.CollegeManagement.service.ILeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveService implements ILeaveService
{
    @Autowired
    private ILeaveRepository repository;

    @Override
    public void addLeave(LeaveApplication leave) {
        repository.save(leave);
    }

    @Override
    public List<LeaveApplication> getAllLeaves() {
        return repository.findAll();
    }

    @Override
    public LeaveApplication getLeaveById(Long id) {
        return repository.findById(id).get();
    }

    @Override
    public void updateLeave(LeaveApplication leave) {

    }

    @Override
    public void deleteLeave(Long id) {

    }
}
