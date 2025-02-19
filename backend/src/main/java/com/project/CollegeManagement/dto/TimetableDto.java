package com.project.CollegeManagement.dto;

import com.project.CollegeManagement.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimetableDto
{
    @Column(nullable = false)
    private String dayOfWeek; // e.g., Monday, Tuesday

    @Column(nullable = false)
    private LocalTime startTime; // Start time of the class/event

    @Column(nullable = false)
    private LocalTime endTime; // End time of the class/event

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false)
    private String location;

    private List<Long> studentId;

    @Column(nullable = false)
    private String status;
}
