package com.project.CollegeManagement.repository;

import com.project.CollegeManagement.entity.Library;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ILibraryRepository extends JpaRepository<Library,Long>
{
    List<Library> findByCategory(String category);
}
