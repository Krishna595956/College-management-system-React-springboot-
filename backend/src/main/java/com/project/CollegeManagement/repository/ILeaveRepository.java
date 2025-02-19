package com.project.CollegeManagement.repository;

import com.project.CollegeManagement.entity.LeaveApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ILeaveRepository extends JpaRepository<LeaveApplication,Long>
{
}
