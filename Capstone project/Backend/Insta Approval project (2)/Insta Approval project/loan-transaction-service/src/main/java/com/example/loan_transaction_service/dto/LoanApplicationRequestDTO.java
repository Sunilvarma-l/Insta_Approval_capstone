package com.example.loan_transaction_service.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.List;

public class LoanApplicationRequestDTO {

    @NotNull
    private Long customerId;

    @NotNull
    @Positive
    private Double loanAmount;

    private List<DocumentUploadDTO> documents;

    // Getters and setters

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public Double getLoanAmount() { return loanAmount; }
    public void setLoanAmount(Double loanAmount) { this.loanAmount = loanAmount; }

    public List<DocumentUploadDTO> getDocuments() { return documents; }
    public void setDocuments(List<DocumentUploadDTO> documents) { this.documents = documents; }
}
