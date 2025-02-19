package com.project.CollegeManagement.repository;

import com.project.CollegeManagement.entity.UploadMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUploadMaterial extends JpaRepository<UploadMaterial,Long> {
}
