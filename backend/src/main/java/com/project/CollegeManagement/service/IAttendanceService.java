package com.project.CollegeManagement.service;

import com.project.CollegeManagement.entity.Attendance;

import java.time.LocalDate;
import java.util.List;

public interface IAttendanceService {
    Attendance markAttendance(Attendance attendance);

    List<Attendance> getAttendanceByStudent(Long studentId);

//    List<Attendance> getAttendanceByClass(Long classId);

//    List<Attendance> getAttendanceByClassAndDate(Long classId, LocalDate date);
}
