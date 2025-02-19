package com.project.CollegeManagement.controller;

import com.project.CollegeManagement.entity.Academy;
import com.project.CollegeManagement.entity.Course;
import com.project.CollegeManagement.entity.Payment;
import com.project.CollegeManagement.entity.User;
import com.project.CollegeManagement.service.IAcademyService;
import com.project.CollegeManagement.service.IPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/college")
public class PaymentController {

    @Autowired
    private IPaymentService paymentService;

    @Autowired
    private IAcademyService academyService;

    @PostMapping("/make/payment/{academyId}/student")
    @PreAuthorize("hasAuthority('Student')")
    public ResponseEntity<?> studentMakePayment(@PathVariable Long academyId,
                                                @RequestBody Payment payment) {
        HashMap<String, Object> res = new HashMap<>();

        Optional<Academy> academyOptional = academyService.getAcademyById(academyId);
        if (!academyOptional.isPresent()) {
            res.put("success", false);
            res.put("err", "Academy not found for id " + academyId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }

//        Academy academy = academyOptional.get();
//
//        Course course = null;
//        for (Course c : academy.getCourses()) {
//            if (c.getId().equals(payment.getCourseRegistration().getId())) {
//                course = c;
//                break;
//            }
//        }
//
//        if (course == null) {
//            res.put("success", false);
//            res.put("err", "Course not found for the provided academy id " + academyId);
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
//        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        try {

            payment.setStatus("PENDING");
            payment.setStudentId(user.getId());
//            payment.setCourseRegistration(course);
            payment.setPaymentDate(LocalDate.now());
//            course.setPaymentStatus("PENDING");
//            course.setStudent(user);
            payment.setStatus("Pending");
            paymentService.makePayment(payment);

//            academyService.createCourse(course);

            res.put("success", true);
            res.put("msg", "Payment Successful");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            res.put("success", false);
            res.put("err", "Payment Failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/get/all/payments")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<?> getAllPayments() {
        HashMap<String, Object> res = new HashMap<>();
        try {
            List<Payment> payments = paymentService.getAllPayments();
            res.put("success", true);
            res.put("payments", payments);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            res.put("success", false);
            res.put("err", "Failed to fetch payments: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    @GetMapping("/get/payments/student/id")
    @PreAuthorize("hasAuthority('Student')")
    public ResponseEntity<?> getPaymentsByStudentId() {
        HashMap<String, Object> res = new HashMap<>();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        try {
            List<Payment> payments = paymentService.getPaymentsByStudentId(user.getId());
            res.put("success", true);
            res.put("payments", payments);
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            res.put("success", false);
            res.put("err", "Failed to fetch payments: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    // Update payment status (Admin)
    @PutMapping("/update/payments/{paymentId}")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<?> updatePayments(@PathVariable Long paymentId) {
        HashMap<String, Object> res = new HashMap<>();
        Payment payment = paymentService.getPaymentById(paymentId);
        if (payment == null) {
            res.put("success", false);
            res.put("err", "Payment not found for id " + paymentId);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
        try {
            // Update the payment status to SUCCESS
            payment.setStatus("SUCCESS");
            paymentService.updatePayment(payment);
            res.put("success", true);
            res.put("msg", "Payment updated successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            // Set status to FAILED in case of failure
            payment.setStatus("FAILED");
            paymentService.updatePayment(payment);
            res.put("success", false);
            res.put("err", "Failed to update payment: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(res);
        }
    }

    // Delete a payment by its ID (Admin)
    @DeleteMapping("/delete/payment/{paymentId}")
    @PreAuthorize("hasAuthority('Admin')")
    public ResponseEntity<?> deletePaymentById(@PathVariable Long paymentId) {
        HashMap<String, Object> res = new HashMap<>();
        try {
            paymentService.deletePaymentById(paymentId);
            res.put("success", true);
            res.put("msg", "Payment deleted successfully");
            return ResponseEntity.status(HttpStatus.OK).body(res);
        } catch (Exception e) {
            res.put("success", false);
            res.put("err", "Failed to delete payment: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
        }
    }
}
