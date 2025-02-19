package com.project.CollegeManagement.service.impl;

import com.project.CollegeManagement.entity.Timetable;
import com.project.CollegeManagement.repository.ITimetableRepository;
import com.project.CollegeManagement.service.ITimetableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TimetableService implements ITimetableService
{
    @Autowired
    private ITimetableRepository repository;

    @Override
    public Timetable createTimetable(Timetable timetable) {
        return repository.save(timetable);
    }

    @Override
    public Timetable updateTimetable(Long id, Timetable timetable) {
        Timetable existingTimetable = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Timetable not found with id: " + id));
        existingTimetable.setDayOfWeek(timetable.getDayOfWeek());
        existingTimetable.setStartTime(timetable.getStartTime());
        existingTimetable.setEndTime(timetable.getEndTime());
        existingTimetable.setSubject(timetable.getSubject());
        existingTimetable.setLocation(timetable.getLocation());
        existingTimetable.setTeacher(timetable.getTeacher());
        existingTimetable.setStudents(timetable.getStudents());
        existingTimetable.setDate(timetable.getDate());
        existingTimetable.setStatus(timetable.getStatus());
        return repository.save(existingTimetable);
    }

    @Override
    public void deleteTimetable(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<Timetable> getTimetableByDay(String dayOfWeek) {
        return repository.findByDayOfWeek(dayOfWeek);
    }

    @Override
    public List<Timetable> getTimetableByTeacher(Long teacherId) {
        return repository.findByTeacherId(teacherId);
    }

    @Override
    public List<Timetable> getTimetableByStudentId(Long studentId) {
        return repository.findByStudentsId(studentId);
    }

    @Override
    public List<Timetable> getTimetableByDate(LocalDateTime date) {
        return repository.findByDate(date);
    }

    @Override
    public List<Timetable> getAllTimetables() {
        return repository.findAll();
    }
}
