package com.project.CollegeManagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Academy
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long instructorId;
    private String name;
    private String description;
    private int duration;
    private String category;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal price;
    private String status;

    @OneToMany(mappedBy = "academy")
    private List<Course> courses;
}
