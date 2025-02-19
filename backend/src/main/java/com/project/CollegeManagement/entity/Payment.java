package com.project.CollegeManagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long studentId;
//    @ManyToOne
//    @JoinColumn(name = "course_registration_id")
//    private Course courseRegistration;
    private BigDecimal amount;
    private LocalDate paymentDate;
    private String paymentMethod;
    private String status;



}

