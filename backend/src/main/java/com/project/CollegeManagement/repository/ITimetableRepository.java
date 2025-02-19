package com.project.CollegeManagement.repository;

import com.project.CollegeManagement.entity.Timetable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ITimetableRepository extends JpaRepository<Timetable,Long>
{
    List<Timetable> findByDayOfWeek(String dayOfWeek);

    List<Timetable> findByTeacherId(Long teacherId);

    @Query(value = "SELECT * FROM timetable t JOIN timetable_students s on s.timetable_id = t.id where s.student_id = :studentId",nativeQuery = true)
    List<Timetable> findByStudentsId(Long studentId);

    List<Timetable> findByDate(LocalDateTime date);
}
