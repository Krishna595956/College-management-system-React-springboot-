package com.project.CollegeManagement.service;

import com.project.CollegeManagement.entity.Payment;

import java.util.List;

public interface IPaymentService
{
    void makePayment(Payment payment);
    List<Payment> getAllPayments();

    List<Payment> getPaymentsByStudentId(Long studentId);

    Payment getPaymentById(Long paymentId);

    void updatePayment(Payment payment);

    void deletePaymentById(Long id);
}
