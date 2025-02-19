package com.project.CollegeManagement.service.impl;

import com.project.CollegeManagement.entity.Library;
import com.project.CollegeManagement.repository.ILibraryRepository;
import com.project.CollegeManagement.service.ILibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LibraryService implements ILibraryService
{
    @Autowired
    private ILibraryRepository repository;

    @Override
    public void addBooksInLibrary(Library library) {
        repository.save(library);
    }

    @Override
    public List<Library> getAllLibraryBooks() {
        return repository.findAll();
    }

    @Override
    public Library getBooksById(Long id) {
        return repository.findById(id).get();
    }

    @Override
    public List<Library> getBooksByCategory(String category) {
        return repository.findByCategory(category);
    }

    @Override
    public void deleteBooksById(Long id) {
        repository.deleteById(id);
    }
}
