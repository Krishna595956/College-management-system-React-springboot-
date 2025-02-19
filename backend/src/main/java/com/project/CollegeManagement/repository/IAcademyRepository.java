package com.project.CollegeManagement.repository;

import com.project.CollegeManagement.entity.Academy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAcademyRepository extends JpaRepository<Academy,Long>
{
}
