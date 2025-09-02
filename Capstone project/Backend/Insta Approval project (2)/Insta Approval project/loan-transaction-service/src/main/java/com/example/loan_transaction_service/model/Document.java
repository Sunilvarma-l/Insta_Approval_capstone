package com.example.loan_transaction_service.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // numeric primary key - auto generated

    private String documentType;

    @Column(name = "document_id")
    private String documentId;  // business-level document ID, string, NOT auto-generated

//    private String filePath;

//    private LocalDate uploadDate;

    @ManyToOne
    @JoinColumn(name = "application_id")
    private LoanApplication loanApplication;

    // Getters and setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDocumentType() { return documentType; }
    public void setDocumentType(String documentType) { this.documentType = documentType; }

    public String getDocumentId() { return documentId; }
    public void setDocumentId(String documentId) { this.documentId = documentId; }

//    public String getFilePath() { return filePath; }
//    public void setFilePath(String filePath) { this.filePath = filePath; }
//
//    public LocalDate getUploadDate() { return uploadDate; }
//    public void setUploadDate(LocalDate uploadDate) { this.uploadDate = uploadDate; }

    public LoanApplication getLoanApplication() { return loanApplication; }
    public void setLoanApplication(LoanApplication loanApplication) { this.loanApplication = loanApplication; }
}
