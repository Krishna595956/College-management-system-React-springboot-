package com.project.CollegeManagement.repository;

import com.project.CollegeManagement.entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IAssignmentRepository extends JpaRepository<Assignment,Long>
{
    List<Assignment> findByTeacherId(Long teacherId);

    List<Assignment> findByDepartment(String department);
}
