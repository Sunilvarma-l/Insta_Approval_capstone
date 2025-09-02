package com.example.loan_transaction_service.repository;

import com.example.loan_transaction_service.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {
}
