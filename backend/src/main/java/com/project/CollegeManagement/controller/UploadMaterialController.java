package com.project.CollegeManagement.controller;

import com.project.CollegeManagement.dto.MaterialDto;
import com.project.CollegeManagement.entity.UploadMaterial;
import com.project.CollegeManagement.service.IUploadMaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
public class UploadMaterialController
{
    @Autowired
    private IUploadMaterialService service;

    @PostMapping("/upload/materials")
    @PreAuthorize("hasAuthority('Teacher')")
    public ResponseEntity<?> uploadMaterials(@ModelAttribute MaterialDto materialDto)
    {
        HashMap<String ,Object> res = new HashMap<>();
        try
        {
            String filepath = Paths.get("").toAbsolutePath().toString();
            Path imageFilePath = Paths.get(filepath, "src", "main", "resources", "static", "documents", materialDto.getFile().getOriginalFilename());
            String imageUrl = materialDto.getFile().getOriginalFilename();
            materialDto.getFile().transferTo(imageFilePath);

            UploadMaterial material = UploadMaterial.builder()
                    .name(materialDto.getName())
                    .description(materialDto.getDescription())
                    .file(imageUrl)
                    .build();

            service.uploadMaterial(material);

            res.put("success",true);
            res.put("msg","material uploaded successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (IOException e)
        {
            res.put("success",false);
            res.put("err","Failed to store the material");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to upload the material");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/get/all/documents")
    public ResponseEntity<?> getAllDocuments()
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            List<UploadMaterial> materials = service.getAllMaterials();
            res.put("success",true);
            res.put("materials",materials);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","Failed to fetch all documents");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @DeleteMapping("/delete/user/{materialId}")
    public ResponseEntity<?> deleteMaterialById(@PathVariable Long materialId)
    {
        HashMap<String,Object> res = new HashMap<>();
        try
        {
            service.deleteMaterialById(materialId);
            res.put("success",true);
            res.put("msg","material deleted successfully");
            return ResponseEntity.status(200).body(res);
        }
        catch (Exception e)
        {
            res.put("success",false);
            res.put("err","material deleted successfully");
            return ResponseEntity.status(404).body(res);
        }
    }
}
