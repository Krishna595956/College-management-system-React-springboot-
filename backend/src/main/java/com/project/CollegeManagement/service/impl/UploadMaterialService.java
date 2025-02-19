package com.project.CollegeManagement.service.impl;

import com.project.CollegeManagement.entity.UploadMaterial;
import com.project.CollegeManagement.repository.IUploadMaterial;
import com.project.CollegeManagement.service.IUploadMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UploadMaterialService implements IUploadMaterialService
{
    @Autowired
    private IUploadMaterial repository;

    @Override
    public void uploadMaterial(UploadMaterial material) {
        repository.save(material);
    }

    @Override
    public List<UploadMaterial> getAllMaterials() {
        return repository.findAll();
    }

    @Override
    public void deleteMaterialById(Long id) {
        repository.deleteById(id);
    }
}
