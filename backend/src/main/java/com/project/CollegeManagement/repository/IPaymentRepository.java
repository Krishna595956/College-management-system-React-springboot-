package com.project.CollegeManagement.repository;

import com.project.CollegeManagement.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPaymentRepository extends JpaRepository<Payment,Long>
{
    List<Payment> getPaymentsByStudentId(Long studentId);
}
