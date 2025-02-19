package com.project.CollegeManagement.dto;

import com.project.CollegeManagement.entity.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
public class AssignmentDto
{
    private String title;
    private String description;
    private String department;
    private String assignmentType;
    private MultipartFile pdfFile;
    private LocalDate dueDate;
}
