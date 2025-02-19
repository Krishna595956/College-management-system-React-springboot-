package com.project.CollegeManagement.repository;

import com.project.CollegeManagement.entity.Feedback;
import com.project.CollegeManagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IFeedbackRepository extends JpaRepository<Feedback,Long>
{
    List<Feedback> findByTeacherId(Long teacherId);
}
