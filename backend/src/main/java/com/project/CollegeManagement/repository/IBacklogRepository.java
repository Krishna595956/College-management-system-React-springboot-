package com.project.CollegeManagement.repository;

import com.project.CollegeManagement.entity.Backlog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IBacklogRepository extends JpaRepository<Backlog,Long>
{
    List<Backlog> findByStudentId(Long studentId);
}
