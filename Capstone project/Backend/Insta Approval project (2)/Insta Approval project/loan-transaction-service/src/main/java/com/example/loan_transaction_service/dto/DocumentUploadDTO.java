package com.example.loan_transaction_service.dto;

public class DocumentUploadDTO {

    private String documentType;

    private String documentId;

    // Getters and setters

    public String getDocumentType() { return documentType; }
    public void setDocumentType(String documentType) { this.documentType = documentType; }

    public String getDocumentId() { return documentId; }
    public void setDocumentId(String documentId) { this.documentId = documentId; }
}
