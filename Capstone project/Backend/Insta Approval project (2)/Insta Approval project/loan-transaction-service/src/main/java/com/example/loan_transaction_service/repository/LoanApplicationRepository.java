package com.example.loan_transaction_service.repository;

import com.example.loan_transaction_service.model.LoanApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long> {
    List<LoanApplication> findByCustomerId(Long customerId);
    List<LoanApplication> findByStatus(LoanApplication.LoanStatus status);
}
