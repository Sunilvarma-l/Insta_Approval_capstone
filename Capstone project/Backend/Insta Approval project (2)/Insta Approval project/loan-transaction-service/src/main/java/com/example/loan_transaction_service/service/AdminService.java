package com.example.loan_transaction_service.service;

import com.example.loan_transaction_service.dto.LoanApprovalRequestDTO;
import com.example.loan_transaction_service.dto.LoanApplicationResponseDTO;
import com.example.loan_transaction_service.exception.ResourceNotFoundException;
import com.example.loan_transaction_service.model.*;
import com.example.loan_transaction_service.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private LoanApplicationRepository loanApplicationRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ApprovalHistoryRepository approvalHistoryRepository;

    public List<LoanApplicationResponseDTO> getPendingLoans() {
        List<LoanApplication> pendingLoans = loanApplicationRepository.findByStatus(LoanApplication.LoanStatus.PENDING);
        return pendingLoans.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public void approveLoan(Long loanId, Long adminId, String remarks) {
        processLoan(loanId, adminId, new LoanApprovalRequestDTO("APPROVE", remarks));
    }

    public void rejectLoan(Long loanId, Long adminId, String remarks) {
        processLoan(loanId, adminId, new LoanApprovalRequestDTO("REJECT", remarks));
    }

    public void processLoan(Long loanId, Long adminId, LoanApprovalRequestDTO dto) {
        LoanApplication loan = loanApplicationRepository.findById(loanId)
                .orElseThrow(() -> new ResourceNotFoundException("Loan application not found"));

        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found"));

        if (loan.getStatus() != LoanApplication.LoanStatus.PENDING) {
            throw new IllegalStateException("Loan already processed");
        }

        LoanApplication.LoanStatus newStatus;

        if ("APPROVE".equalsIgnoreCase(dto.getAction())) {
            newStatus = LoanApplication.LoanStatus.APPROVED;
        } else if ("REJECT".equalsIgnoreCase(dto.getAction())) {
            newStatus = LoanApplication.LoanStatus.REJECTED;
        } else {
            throw new IllegalArgumentException("Invalid action");
        }

        loan.setStatus(newStatus);
        loan.setRemarks(dto.getRemarks());
        loanApplicationRepository.save(loan);

        ApprovalHistory history = new ApprovalHistory();
        history.setLoanApplication(loan);
        history.setAdmin(admin);
        history.setAction(newStatus.name());
        history.setRemarks(dto.getRemarks());
        history.setActionDate(LocalDateTime.now());
        approvalHistoryRepository.save(history);
    }

    private LoanApplicationResponseDTO mapToDto(LoanApplication loan) {
        LoanApplicationResponseDTO dto = new LoanApplicationResponseDTO();
        dto.setApplicationId(loan.getApplicationId());
        dto.setCustomerId(loan.getCustomerId());
        dto.setLoanAmount(loan.getLoanAmount());
        dto.setApplicationDate(loan.getApplicationDate());
        dto.setStatus(loan.getStatus());
        dto.setRemarks(loan.getRemarks());
        if (loan.getDocuments() != null) {
            dto.setUploadedDocuments(loan.getDocuments().stream()
                    .map(Document::getDocumentId)  // Show business document IDs here
                    .collect(Collectors.toList()));
        }
        return dto;
    }
}
