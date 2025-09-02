package com.example.loan_transaction_service.service;

import com.example.loan_transaction_service.dto.LoanApplicationRequestDTO;
import com.example.loan_transaction_service.dto.LoanApplicationResponseDTO;
import com.example.loan_transaction_service.exception.ResourceNotFoundException;
import com.example.loan_transaction_service.model.LoanApplication;
import com.example.loan_transaction_service.model.Document;
import com.example.loan_transaction_service.repository.DocumentRepository;
import com.example.loan_transaction_service.repository.LoanApplicationRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoanApplicationService {

    @Autowired
    private LoanApplicationRepository loanApplicationRepository;

    @Autowired
    private DocumentRepository documentRepository;

    @Transactional
    public LoanApplicationResponseDTO applyLoan(LoanApplicationRequestDTO dto) {
        LoanApplication loan = new LoanApplication();
        loan.setCustomerId(dto.getCustomerId());
        loan.setLoanAmount(dto.getLoanAmount());
        loan.setApplicationDate(LocalDate.now());
        loan.setStatus(LoanApplication.LoanStatus.PENDING);

        LoanApplication savedLoan = loanApplicationRepository.save(loan);

        if (dto.getDocuments() != null) {
            List<Document> docs = dto.getDocuments().stream().map(d -> {
                Document doc = new Document();
                doc.setDocumentType(d.getDocumentType());
                doc.setDocumentId(d.getDocumentId());
                doc.setLoanApplication(savedLoan);
                return doc;
            }).collect(Collectors.toList());

            documentRepository.saveAll(docs);
            savedLoan.setDocuments(docs);
        }

        return mapToDto(savedLoan);
    }

    public LoanApplicationResponseDTO getLoanStatus(Long loanId) {
        LoanApplication loan = loanApplicationRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));
        return mapToDto(loan);
    }

    public List<LoanApplicationResponseDTO> getLoansByCustomer(Long customerId) {
        return loanApplicationRepository.findByCustomerId(customerId).stream()
                .map(this::mapToDto).collect(Collectors.toList());
    }

    public void cancelLoan(Long loanId) {
        LoanApplication loan = loanApplicationRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));
        if (loan.getStatus() != LoanApplication.LoanStatus.PENDING) {
            throw new IllegalStateException("Only pending loans can be cancelled");
        }
        loanApplicationRepository.delete(loan);
    }

    @Transactional
    public LoanApplicationResponseDTO updateLoan(Long loanId, LoanApplicationRequestDTO dto) {
        LoanApplication loan = loanApplicationRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));

        if (loan.getStatus() != LoanApplication.LoanStatus.PENDING) {
            throw new IllegalStateException("Only pending loans can be updated");
        }

        loan.setCustomerId(dto.getCustomerId());
        loan.setLoanAmount(dto.getLoanAmount());
        // Add or update other fields as needed

        LoanApplication updatedLoan = loanApplicationRepository.save(loan);
        return mapToDto(updatedLoan);
    }

    private LoanApplicationResponseDTO mapToDto(LoanApplication loan) {
        LoanApplicationResponseDTO dto = new LoanApplicationResponseDTO();
        dto.setApplicationId(loan.getApplicationId());
        dto.setCustomerId(loan.getCustomerId());
        dto.setLoanAmount(loan.getLoanAmount());
        dto.setApplicationDate(loan.getApplicationDate());
        dto.setStatus(loan.getStatus());
        dto.setRemarks(loan.getRemarks());
        // Uncomment if uploaded documents needed here
//        if (loan.getDocuments() != null) {
//            dto.setUploadedDocuments(loan.getDocuments().stream()
//                    .map(Document::getFilePath)
//                    .collect(Collectors.toList()));
//        }
        return dto;
    }
}
