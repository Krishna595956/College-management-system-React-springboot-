package com.project.CollegeManagement.service;

import com.project.CollegeManagement.entity.Backlog;

import java.util.List;

public interface IBacklogService
{
    void addBacklogs(Backlog backlog);

    List<Backlog> getBacklogsByStudentId(Long studentId);
}
