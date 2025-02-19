package com.project.CollegeManagement.controller;

import com.project.CollegeManagement.dto.LibraryDto;
import com.project.CollegeManagement.entity.Library;
import com.project.CollegeManagement.service.ILibraryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/college")
public class LibraryController
{
    private final ILibraryService service;

    public LibraryController(ILibraryService service) {
        this.service = service;
    }

    @PostMapping("/library/add/books")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<?> addBooksInLibrary(@ModelAttribute LibraryDto library)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            String filepath = Paths.get("").toAbsolutePath().toString();
            Path booksPath = Paths.get(filepath,"src","main","resources","static","books",library.getBook().getOriginalFilename());
            String bookUrl = library.getBook().getOriginalFilename();
            library.getBook().transferTo(booksPath);

            Library library1 = Library.builder()
                    .bookName(library.getBookName())
                    .description(library.getDescription())
                    .category(library.getCategory())
                    .isbnNumber(library.getIsbnNumber())
                    .book(bookUrl)
                    .build();

            service.addBooksInLibrary(library1);
            res.put("success",true);
            res.put("msg","Book Added Successfully");
            return ResponseEntity.status(200).body(res);
        }
        catch (IOException e)
        {
            res.put("success",false);
            res.put("err","Failed to store the book in provided path");
            return ResponseEntity.status(500).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Book is not added in the library");
            return ResponseEntity.status(500).body(res);
        }
    }

    @GetMapping("/get/all/books")
    public ResponseEntity<?> getAllLibraryBooks()
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<Library> libraries = service.getAllLibraryBooks();
            res.put("success",true);
            res.put("libraries",libraries);
            return ResponseEntity.status(200).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to fetch the books in the library");
            return ResponseEntity.status(500).body(res);
        }
    }

    @GetMapping("/get/books/by/category")
    public ResponseEntity<?> getLibraryBooksByCategory(@RequestParam String category)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<Library> books = service.getBooksByCategory(category);
            res.put("success",true);
            res.put("books",books);
            return ResponseEntity.status(200).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","No Books are found for provided category is "+ category);
            return ResponseEntity.status(404).body(res);
        }
    }

    @DeleteMapping("/delete/book/{id}")
    public ResponseEntity<?> deleteBookById(@PathVariable Long id)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            service.deleteBooksById(id);
            res.put("success",true);
            res.put("msg","successfully delete the book");
            return ResponseEntity.status(200).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Book is not found for provided id is"+id);
            return ResponseEntity.status(404).body(res);
        }
    }
}
