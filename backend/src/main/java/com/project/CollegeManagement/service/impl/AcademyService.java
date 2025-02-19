package com.project.CollegeManagement.service.impl;

import com.project.CollegeManagement.entity.Academy;
import com.project.CollegeManagement.entity.Course;
import com.project.CollegeManagement.repository.IAcademyRepository;
import com.project.CollegeManagement.repository.ICourseRepository;
import com.project.CollegeManagement.service.IAcademyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AcademyService implements IAcademyService
{
    @Autowired
    private IAcademyRepository academyRepository;

    @Autowired
    private ICourseRepository courseRepository;

    @Override
    public List<Academy> getAllAcademies() {
        return academyRepository.findAll();
    }

    @Override
    public Optional<Academy> getAcademyById(Long id) {
        return academyRepository.findById(id);
    }

    @Override
    public Academy createAcademy(Academy academy) {
        return academyRepository.save(academy);
    }

    @Override
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public void linkCourseToAcademy(Long academyId, Long courseId) {
        Optional<Academy> academy = academyRepository.findById(academyId);
        Optional<Course> course = courseRepository.findById(courseId);

        if (academy.isPresent() && course.isPresent()) {
            Course courseToUpdate = course.get();
            courseToUpdate.setAcademy(academy.get());
            courseRepository.save(courseToUpdate);
        }
    }
}
