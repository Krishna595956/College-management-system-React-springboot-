package com.project.CollegeManagement.service;

import com.project.CollegeManagement.entity.Timetable;

import java.time.LocalDateTime;
import java.util.List;

public interface ITimetableService
{
    Timetable createTimetable(Timetable timetable);

    Timetable updateTimetable(Long id, Timetable timetable);

    void deleteTimetable(Long id);

    List<Timetable> getTimetableByDay(String dayOfWeek);

    List<Timetable> getTimetableByTeacher(Long teacherId);

    List<Timetable> getTimetableByStudentId(Long studentId);

    List<Timetable> getTimetableByDate(LocalDateTime date);

    List<Timetable> getAllTimetables();
}
