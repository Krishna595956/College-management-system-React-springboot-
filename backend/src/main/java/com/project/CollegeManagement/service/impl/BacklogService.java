package com.project.CollegeManagement.service.impl;

import com.project.CollegeManagement.entity.Backlog;
import com.project.CollegeManagement.repository.IBacklogRepository;
import com.project.CollegeManagement.service.IBacklogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BacklogService implements IBacklogService
{
    @Autowired
    private IBacklogRepository repository;
    @Override
    public void addBacklogs(Backlog backlog) {
        repository.save(backlog);
    }

    @Override
    public List<Backlog> getBacklogsByStudentId(Long studentId) {
        return repository.findByStudentId(studentId);
    }
}
