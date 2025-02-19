package com.project.CollegeManagement.repository;

import com.project.CollegeManagement.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IAttendanceRepository extends JpaRepository<Attendance,Long>
{
    List<Attendance> findByStudentId(Long studentId);

//    List<Attendance> findByClassAcademyIdAndDate(Long classId, LocalDate date);
//
//    List<Attendance> findByClassAcademyId(Long classId);
}
