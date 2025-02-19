package com.project.CollegeManagement.service;

import com.project.CollegeManagement.entity.Library;

import java.util.List;

public interface ILibraryService
{
    void addBooksInLibrary(Library library);

    List<Library> getAllLibraryBooks();

    Library getBooksById(Long id);

    List<Library> getBooksByCategory(String category);

    void deleteBooksById(Long id);
}
