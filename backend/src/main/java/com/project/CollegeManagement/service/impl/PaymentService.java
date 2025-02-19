package com.project.CollegeManagement.service.impl;

import com.project.CollegeManagement.entity.Payment;
import com.project.CollegeManagement.repository.IPaymentRepository;
import com.project.CollegeManagement.service.IPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService implements IPaymentService
{
    @Autowired
    private IPaymentRepository repository;

    @Override
    public void makePayment(Payment payment) {
        repository.save(payment);
    }

    @Override
    public List<Payment> getAllPayments() {
        return repository.findAll();
    }

    @Override
    public List<Payment> getPaymentsByStudentId(Long studentId) {
        return repository.getPaymentsByStudentId(studentId);
    }

    @Override
    public Payment getPaymentById(Long paymentId) {
        return repository.findById(paymentId).get();
    }

    @Override
    public void updatePayment(Payment payment) {
        repository.save(payment);
    }

    @Override
    public void deletePaymentById(Long id) {
        repository.deleteById(id);
    }
}
