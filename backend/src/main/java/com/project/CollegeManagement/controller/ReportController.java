package com.project.CollegeManagement.controller;

import com.project.CollegeManagement.service.impl.ReportService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class ReportController
{
    @Autowired
    private ReportService reportService;

    @GetMapping("/generate-reports")
    public ResponseEntity<?> generateReports(@RequestParam String reportType) {
        try {
            String filePath = getReportFilePath(reportType);
            if (filePath == null) {
                return ResponseEntity.badRequest().body("Invalid report type.");
            }

            File file = new File(filePath);
            if (file.exists()) {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                headers.setContentDisposition(ContentDisposition.builder("attachment")
                        .filename(file.getName())
                        .build());

                InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
                return ResponseEntity.ok()
                        .headers(headers)
                        .contentLength(file.length())
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Report file not found.");
            }

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing the report request.");
        }
    }

    @GetMapping("/report-overview")
    public ResponseEntity<?> getReportOverview() {
        try {
            Map<String, Object> reportOverview = new HashMap<>();
            reportOverview.put("academy", getReportMetadata("academy_report.xlsx"));
            reportOverview.put("assignment", getReportMetadata("assignment_report.xlsx"));
            reportOverview.put("attendance", getReportMetadata("attendance_report.xlsx"));
            reportOverview.put("backlogs", getReportMetadata("backlog_report.xlsx"));
            reportOverview.put("leave", getReportMetadata("leave_report.xlsx"));
            reportOverview.put("library", getReportMetadata("library_report.xlsx"));
            reportOverview.put("material", getReportMetadata("uploaded_material_report.xlsx"));
            reportOverview.put("payment", getReportMetadata("payment_report.xlsx"));
            reportOverview.put("user", getReportMetadata("user_report.xlsx"));

            return ResponseEntity.ok(reportOverview);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching report overview.");
        }
    }

    private Map<String, Object> getReportMetadata(String filePath) {
        Map<String, Object> metadata = new HashMap<>();
        File file = new File(filePath);

        if (file.exists()) {
            metadata.put("fileName", file.getName());
            metadata.put("size", file.length());
            metadata.put("lastModified", new Date(file.lastModified()));
            metadata.put("recordCount", getRecordCount(file));
        } else {
            metadata.put("error", "File not found.");
        }

        return metadata;
    }

    private int getRecordCount(File file) {
        return 100;
    }

    @GetMapping("/report-analytics")
    public ResponseEntity<?> getReportAnalytics(@RequestParam("reportType") String reportType) {
        try {
            String filePath = getReportFilePath(reportType);
            if (filePath == null) {
                return ResponseEntity.badRequest().body("Invalid report type.");
            }

            Map<String, Object> analytics = analyzeReportData(filePath);
            return ResponseEntity.ok(analytics);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing analytics request.");
        }
    }

    private String getReportFilePath(String reportType) {
        switch (reportType.toLowerCase()) {
            case "academy":
                return "academy_report.xlsx";
            case "assignment":
                return "assignment_report.xlsx";
            case "attendance":
                return "attendance_report.xlsx";
            case "backlogs":
                return "backlog_report.xlsx";
            case "leave":
                return "leave_report.xlsx";
            case "library":
            return "library_report.xlsx";
            case "material":
                return "uploaded_material_report.xlsx";
            case "payment":
                return "payment_report.xlsx";
            case "user":
                return "user_report.xlsx";
            default:
                return null;
        }
    }

    private Map<String, Object> analyzeReportData(String filePath) {
        Map<String, Object> analytics = new HashMap<>();
        File file = new File(filePath);

        if (file.exists()) {
            try {
                if (filePath.equals("attendance_report.xlsx")) {
                    double averageAttendance = getAverageAttendanceFromFile(filePath);
                    String highestAttendanceDay = getHighestAttendanceDay(filePath);
                    String lowestAttendanceDay = getLowestAttendanceDay(filePath);

                    analytics.put("averageAttendance", averageAttendance);
                    analytics.put("highestAttendanceDay", highestAttendanceDay);
                    analytics.put("lowestAttendanceDay", lowestAttendanceDay);
                } else if (filePath.equals("payment_report.xlsx")) {
                    double totalPayments = getTotalPaymentsFromFile(filePath);
                    double highestPayment = getHighestPayment(filePath);
                    double lowestPayment = getLowestPayment(filePath);

                    analytics.put("totalPayments", totalPayments);
                    analytics.put("highestPayment", highestPayment);
                    analytics.put("lowestPayment", lowestPayment);
                } else if (filePath.equals("user_report.xlsx")) {
                    int totalUsers = getTotalUsers(filePath);
                    int newUsers = getNewUsers(filePath);

                    analytics.put("totalUsers", totalUsers);
                    analytics.put("newUsers", newUsers);
                }
            } catch (IOException e) {
                analytics.put("error", "Error processing the report file.");
            }
        } else {
            analytics.put("error", "File not found.");
        }

        return analytics;
    }

    private double getAverageAttendanceFromFile(String filePath) throws IOException {
        FileInputStream fis = new FileInputStream(filePath);
        Workbook workbook = new XSSFWorkbook(fis);
        Sheet sheet = workbook.getSheetAt(0);
        double totalAttendance = 0;
        int rowCount = 0;

        for (Row row : sheet) {
            Cell cell = row.getCell(2);
            if (cell != null && cell.getCellType() == CellType.NUMERIC) {
                totalAttendance += cell.getNumericCellValue();
                rowCount++;
            }
        }

        workbook.close();
        fis.close();

        return rowCount > 0 ? totalAttendance / rowCount : 0;
    }

    private String getHighestAttendanceDay(String filePath) {
        // Replace with actual logic for attendance analysis
        return "Monday";
    }

    private String getLowestAttendanceDay(String filePath) {
        // Replace with actual logic for attendance analysis
        return "Friday";
    }

    private double getTotalPaymentsFromFile(String filePath) throws IOException {
        FileInputStream fis = new FileInputStream(filePath);
        Workbook workbook = new XSSFWorkbook(fis);
        Sheet sheet = workbook.getSheetAt(0);
        double totalPayments = 0;

        for (Row row : sheet) {
            Cell cell = row.getCell(1);
            if (cell != null && cell.getCellType() == CellType.NUMERIC) {
                totalPayments += cell.getNumericCellValue();
            }
        }

        workbook.close();
        fis.close();

        return totalPayments;
    }

    private double getHighestPayment(String filePath) throws IOException {
        FileInputStream fis = new FileInputStream(filePath);
        Workbook workbook = new XSSFWorkbook(fis);
        Sheet sheet = workbook.getSheetAt(0);
        double highestPayment = Double.MIN_VALUE;

        for (Row row : sheet) {
            Cell cell = row.getCell(1);
            if (cell != null && cell.getCellType() == CellType.NUMERIC) {
                double payment = cell.getNumericCellValue();
                if (payment > highestPayment) {
                    highestPayment = payment;
                }
            }
        }

        workbook.close();
        fis.close();

        return highestPayment;
    }

    private double getLowestPayment(String filePath) throws IOException {
        FileInputStream fis = new FileInputStream(filePath);
        Workbook workbook = new XSSFWorkbook(fis);
        Sheet sheet = workbook.getSheetAt(0);
        double lowestPayment = Double.MAX_VALUE;

        for (Row row : sheet) {
            Cell cell = row.getCell(1);
            if (cell != null && cell.getCellType() == CellType.NUMERIC) {
                double payment = cell.getNumericCellValue();
                if (payment < lowestPayment) {
                    lowestPayment = payment;
                }
            }
        }

        workbook.close();
        fis.close();

        return lowestPayment;
    }

    private int getTotalUsers(String filePath) throws IOException {
        FileInputStream fis = new FileInputStream(filePath);
        Workbook workbook = new XSSFWorkbook(fis);
        Sheet sheet = workbook.getSheetAt(0);
        int totalUsers = 0;

        for (Row row : sheet) {
            totalUsers++;
        }

        workbook.close();
        fis.close();

        return totalUsers;
    }

    private int getNewUsers(String filePath) throws IOException {
        FileInputStream fis = new FileInputStream(filePath);
        Workbook workbook = new XSSFWorkbook(fis);
        Sheet sheet = workbook.getSheetAt(0);
        int newUsers = 0;

        for (Row row : sheet) {
            Cell cell = row.getCell(2);
            if (cell != null && cell.getCellType() == CellType.STRING) {
                String registrationDate = cell.getStringCellValue();
                if (isNewUser (registrationDate)) {
                    newUsers++;
                }
            }
        }

        workbook.close();
        fis.close();

        return newUsers;
    }

    private boolean isNewUser (String registrationDate) {
        return registrationDate.contains("2024");
    }
}
