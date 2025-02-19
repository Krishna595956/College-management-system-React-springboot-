package com.project.CollegeManagement.service.impl;

import com.project.CollegeManagement.entity.*;
import com.project.CollegeManagement.repository.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    private IAcademyRepository academyRepository;

    @Autowired
    private IAssignmentRepository assignmentRepository;

    @Autowired
    private IAttendanceRepository attendanceRepository;

    @Autowired
    private IBacklogRepository backlogRepository;

    @Autowired
    private ILeaveRepository leaveRepository;

    @Autowired
    private ILibraryRepository libraryRepository;

    @Autowired
    private IUploadMaterial uploadMaterialRepository;

    @Autowired
    private IPaymentRepository paymentRepository;

    @Autowired
    private IUserRepository userRepository;

    @Transactional
    public void generateReports() {

        List<Academy> academies = academyRepository.findAll();
        generateAcademyReport(academies);

        List<Assignment> assignments = assignmentRepository.findAll();
        generateAssignmentReport(assignments);

        List<Attendance> attendanceRecords = attendanceRepository.findAll();
        generateAttendanceReport(attendanceRecords);

        List<Backlog> backlogs = backlogRepository.findAll();
        generateBacklogReport(backlogs);

        // Generate Leave Report
        List<LeaveApplication> leaves = leaveRepository.findAll();
        generateLeaveReport(leaves);

        // Generate Library Report
        List<Library> libraryRecords = libraryRepository.findAll();
        generateLibraryReport(libraryRecords);

        // Generate Uploaded Materials Report
        List<UploadMaterial> uploadMaterials = uploadMaterialRepository.findAll();
        generateUploadMaterialReport(uploadMaterials);

        // Generate User Report
        List<User> users = userRepository.findAll();
        generateUserReport(users);

        List<Payment> payments = paymentRepository.findAll();
        generatePaymentReport(payments);
    }

    // Academy Report Generation
    private void generateAcademyReport(List<Academy> academies) {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Academy Report");
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Academy ID");
            header.createCell(1).setCellValue("Academy Name");
            header.createCell(2).setCellValue("Location");

            int rowNum = 1;
            for (Academy academy : academies) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(academy.getId());
                row.createCell(1).setCellValue(academy.getName());
                row.createCell(2).setCellValue(academy.getDuration());
            }

            FileOutputStream fileOut = new FileOutputStream("academy_report.xlsx");
            workbook.write(fileOut);
            fileOut.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private void generateAssignmentReport(List<Assignment> assignments) {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Assignment Report");
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Assignment ID");
            header.createCell(1).setCellValue("Title");
            header.createCell(2).setCellValue("Due Date");
            header.createCell(3).setCellValue("Description");

            int rowNum = 1;
            for (Assignment assignment : assignments) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(assignment.getId());
                row.createCell(1).setCellValue(assignment.getTitle());
                row.createCell(2).setCellValue(assignment.getDueDate().toString());
                row.createCell(3).setCellValue(assignment.getDescription());
            }

            FileOutputStream fileOut = new FileOutputStream("assignment_report.xlsx");
            workbook.write(fileOut);
            fileOut.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Attendance Report Generation
    private void generateAttendanceReport(List<Attendance> attendanceRecords) {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Attendance Report");
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Student ID");
            header.createCell(1).setCellValue("Attendance Date");
            header.createCell(2).setCellValue("Status");

            int rowNum = 1;
            for (Attendance attendance : attendanceRecords) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(attendance.getStudent().getName());
                row.createCell(1).setCellValue(attendance.getDate().toString());
                row.createCell(2).setCellValue(attendance.isPresent());
            }

            FileOutputStream fileOut = new FileOutputStream("attendance_report.xlsx");
            workbook.write(fileOut);
            fileOut.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Backlog Report Generation
    private void generateBacklogReport(List<Backlog> backlogs) {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Backlog Report");
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Student ID");
            header.createCell(1).setCellValue("Course Name");
            header.createCell(2).setCellValue("Backlog Status");

            int rowNum = 1;
            for (Backlog backlog : backlogs) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(backlog.getStudent().getName());
                row.createCell(1).setCellValue(backlog.getSubjectName());
                row.createCell(2).setCellValue(backlog.getGrade());
            }

            FileOutputStream fileOut = new FileOutputStream("backlog_report.xlsx");
            workbook.write(fileOut);
            fileOut.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Leave Report Generation
    private void generateLeaveReport(List<LeaveApplication> leaves) {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Leave Report");
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Student ID");
            header.createCell(1).setCellValue("Leave Date");
            header.createCell(2).setCellValue("Leave Type");

            int rowNum = 1;
            for (LeaveApplication leave : leaves) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(leave.getStudentId());
                row.createCell(1).setCellValue(leave.getStartDate());
                row.createCell(2).setCellValue(leave.getEndDate());
                row.createCell(3).setCellValue(leave.getStatus());
            }

            FileOutputStream fileOut = new FileOutputStream("leave_report.xlsx");
            workbook.write(fileOut);
            fileOut.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    private void generateLibraryReport(List<Library> libraryRecords) {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Library Report");
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Book ID");
            header.createCell(1).setCellValue("Book Title");
            header.createCell(2).setCellValue("Issued To");

            int rowNum = 1;
            for (Library library : libraryRecords) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(library.getBookName());
                row.createCell(1).setCellValue(library.getIsbnNumber());
                row.createCell(2).setCellValue(library.getCategory());
            }

            FileOutputStream fileOut = new FileOutputStream("library_report.xlsx");
            workbook.write(fileOut);
            fileOut.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // Uploaded Material Report Generation
    private void generateUploadMaterialReport(List<UploadMaterial> uploadMaterials) {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Uploaded Materials Report");
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Material ID");
            header.createCell(1).setCellValue("Title");
            header.createCell(2).setCellValue("Uploaded By");

            int rowNum = 1;
            for (UploadMaterial material : uploadMaterials) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(material.getName());
                row.createCell(1).setCellValue(material.getDescription());
                row.createCell(2).setCellValue(material.getFile());
            }

            FileOutputStream fileOut = new FileOutputStream("uploaded_material_report.xlsx");
            workbook.write(fileOut);
            fileOut.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void generatePaymentReport(List<Payment> payments) {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Payment Report");
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Student ID");
            header.createCell(1).setCellValue("Payment Date");
            header.createCell(2).setCellValue("Payment Method");
            header.createCell(3).setCellValue("Amount");
            header.createCell(4).setCellValue("Status");

            int rowNum = 1;
            for (Payment payment : payments) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(payment.getStudentId());
                row.createCell(1).setCellValue(payment.getPaymentDate());
                row.createCell(2).setCellValue(payment.getPaymentMethod());
                row.createCell(3).setCellValue((RichTextString) payment.getAmount());
                row.createCell(4).setCellValue(payment.getStatus());
            }

            FileOutputStream fileOut = new FileOutputStream("payment_report.xlsx");
            workbook.write(fileOut);
            fileOut.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void generateUserReport(List<User> users) {
        try (XSSFWorkbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("User Report");
            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("User ID");
            header.createCell(1).setCellValue("User Name");
            header.createCell(2).setCellValue("Role");

            int rowNum = 1;
            for (User user : users) {
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(user.getId());
                row.createCell(1).setCellValue(user.getName());
                row.createCell(2).setCellValue(user.getRole());
            }

            FileOutputStream fileOut = new FileOutputStream("user_report.xlsx");
            workbook.write(fileOut);
            fileOut.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
