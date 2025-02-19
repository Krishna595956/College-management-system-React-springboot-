package com.project.CollegeManagement.service.impl;

import com.project.CollegeManagement.entity.Attendance;
import com.project.CollegeManagement.repository.IAttendanceRepository;
import com.project.CollegeManagement.service.IAttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AttendanceService implements IAttendanceService
{
    private final IAttendanceRepository attendanceRepository;

    @Autowired
    public AttendanceService(IAttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    @Override
    public Attendance markAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    @Override
    public List<Attendance> getAttendanceByStudent(Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }

//    @Override
//    public List<Attendance> getAttendanceByClass(Long classId) {
//        return attendanceRepository.findByClassAcademyId(classId);
//    }

//    @Override
//    public List<Attendance> getAttendanceByClassAndDate(Long classId, LocalDate date) {
//        return attendanceRepository.findByClassAcademyIdAndDate(classId, date);
//    }
}
