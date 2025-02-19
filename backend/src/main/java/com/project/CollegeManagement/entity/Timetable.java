package com.project.CollegeManagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Timetable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String dayOfWeek; // e.g., Monday, Tuesday

    @Column(nullable = false)
    private LocalTime startTime; // Start time of the class/event

    @Column(nullable = false)
    private LocalTime endTime; // End time of the class/event

    @Column(nullable = false)
    private String subject; // Subject being taught

    @Column(nullable = false)
    private String location; // Classroom or location of the event

    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    private User teacher;

    @ManyToMany
    @JoinTable(
            name = "timetable_students",
            joinColumns = @JoinColumn(name = "timetable_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private List<User> students;

    @Column(nullable = false)
    private LocalDateTime date; // Specific date of the class/event

    @Column(nullable = false)
    private String status; // e.g., Scheduled, Cancelled
}
