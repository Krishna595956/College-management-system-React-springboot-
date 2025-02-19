package com.project.CollegeManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LibraryDto
{
    private String bookName;
    private String description;
    private String isbnNumber;
    private String category;
    private MultipartFile book;
}
