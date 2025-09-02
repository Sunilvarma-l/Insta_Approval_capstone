package com.example.loan_transaction_service.dto;

import com.example.loan_transaction_service.model.LoanApplication.LoanStatus;

import java.time.LocalDate;
import java.util.List;

public class LoanApplicationResponseDTO {

    private Long applicationId;

    private Long customerId;

    private Double loanAmount;

    private LocalDate applicationDate;

    private LoanStatus status;

    private String remarks;

    private List<String> uploadedDocuments;

    // Getters and setters

    public Long getApplicationId() { return applicationId; }
    public void setApplicationId(Long applicationId) { this.applicationId = applicationId; }

    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }

    public Double getLoanAmount() { return loanAmount; }
    public void setLoanAmount(Double loanAmount) { this.loanAmount = loanAmount; }

    public LocalDate getApplicationDate() { return applicationDate; }
    public void setApplicationDate(LocalDate applicationDate) { this.applicationDate = applicationDate; }

    public LoanStatus getStatus() { return status; }
    public void setStatus(LoanStatus status) { this.status = status; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public List<String> getUploadedDocuments() { return uploadedDocuments; }
    public void setUploadedDocuments(List<String> uploadedDocuments) { this.uploadedDocuments = uploadedDocuments; }
}
