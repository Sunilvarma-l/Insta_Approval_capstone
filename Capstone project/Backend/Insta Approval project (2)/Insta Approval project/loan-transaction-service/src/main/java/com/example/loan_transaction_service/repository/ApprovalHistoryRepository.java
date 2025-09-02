package com.example.loan_transaction_service.repository;

import com.example.loan_transaction_service.model.ApprovalHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApprovalHistoryRepository extends JpaRepository<ApprovalHistory, Long> {
}
