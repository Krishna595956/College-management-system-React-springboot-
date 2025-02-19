package com.project.CollegeManagement.service;

import com.project.CollegeManagement.entity.Academy;
import com.project.CollegeManagement.entity.Course;

import java.util.List;
import java.util.Optional;

public interface IAcademyService
{

    List<Academy> getAllAcademies();

    Optional<Academy> getAcademyById(Long id);

    Academy createAcademy(Academy academy);

    Course createCourse(Course course);

    void linkCourseToAcademy(Long academyId, Long courseId);
}
