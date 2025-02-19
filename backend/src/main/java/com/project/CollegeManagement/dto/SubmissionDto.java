package com.project.CollegeManagement.dto;

import com.project.CollegeManagement.entity.Assignment;
import com.project.CollegeManagement.entity.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
public class SubmissionDto
{
    private MultipartFile pdfFile;

    private LocalDate submissionDate;
}
