package com.project.CollegeManagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

//    @ManyToOne
//    @JoinColumn(name = "class_id", nullable = false)
//    private Academy classAcademy;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private boolean present;
}
