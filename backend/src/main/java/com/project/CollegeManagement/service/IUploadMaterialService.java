package com.project.CollegeManagement.service;

import com.project.CollegeManagement.entity.UploadMaterial;

import java.util.List;

public interface IUploadMaterialService
{
    void uploadMaterial(UploadMaterial material);

    List<UploadMaterial> getAllMaterials();

    void deleteMaterialById(Long id);
}
