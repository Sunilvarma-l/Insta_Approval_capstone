package com.example.loan_transaction_service.dto;

import jakarta.validation.constraints.NotBlank;

public class LoanApprovalRequestDTO {

    @NotBlank
    private String action; // APPROVE or REJECT

    private String remarks;

    // Parameterized constructor
    public LoanApprovalRequestDTO(String action, String remarks) {
        this.action = action;
        this.remarks = remarks;
    }

    // Default constructor required for deserialization
    public LoanApprovalRequestDTO() {
    }

    // Getters and setters
    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}
