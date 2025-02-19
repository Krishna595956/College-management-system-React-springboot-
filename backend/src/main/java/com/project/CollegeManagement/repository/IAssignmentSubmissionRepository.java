package com.project.CollegeManagement.repository;

import com.project.CollegeManagement.entity.AssignmentSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IAssignmentSubmissionRepository extends JpaRepository<AssignmentSubmission,Long>
{
    List<AssignmentSubmission> findByAssignmentId(Long assignmentId);

    List<AssignmentSubmission> findByStudentId(Long studentId);
}
