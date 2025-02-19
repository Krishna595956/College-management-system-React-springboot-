package com.project.CollegeManagement.repository;

import com.project.CollegeManagement.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface ICourseRepository extends JpaRepository<Course,Long>
{
    List<Course> getCoursesByAcademyId(@PathVariable Long academyId);
}
