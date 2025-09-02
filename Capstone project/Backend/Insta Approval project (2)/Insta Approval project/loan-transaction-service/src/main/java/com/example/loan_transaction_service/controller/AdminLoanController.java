package com.example.loan_transaction_service.controller;

import com.example.loan_transaction_service.dto.LoanApprovalRequestDTO;
import com.example.loan_transaction_service.dto.LoanApplicationResponseDTO;
import com.example.loan_transaction_service.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/v1/admin/loans")
public class AdminLoanController {

    @Autowired
    private AdminService adminService;

    // Fetch all pending loan applications
    @GetMapping("/pending")
    public ResponseEntity<List<LoanApplicationResponseDTO>> getPendingLoans() {
        List<LoanApplicationResponseDTO> pendingLoans = adminService.getPendingLoans();
        return ResponseEntity.ok(pendingLoans);
    }

    // Approve a loan
    @PutMapping("/approve/{loanId}")
    public ResponseEntity<Void> approveLoan(
            @PathVariable Long loanId,
            @RequestParam Long adminId,
            @Valid @RequestBody(required = false) LoanApprovalRequestDTO dto) {
        adminService.approveLoan(loanId, adminId, dto != null ? dto.getRemarks() : null);
        return ResponseEntity.ok().build();
    }

    // Reject a loan with remarks
    @PutMapping("/reject/{loanId}")
    public ResponseEntity<Void> rejectLoan(
            @PathVariable Long loanId,
            @RequestParam Long adminId,
            @Valid @RequestBody LoanApprovalRequestDTO dto) {
        adminService.rejectLoan(loanId, adminId, dto.getRemarks());
        return ResponseEntity.ok().build();
    }

    // Optional: existing combined process endpoint
    @PutMapping("/{loanId}/process")
    public ResponseEntity<Void> processLoan(
            @PathVariable Long loanId,
            @RequestParam Long adminId,
            @Valid @RequestBody LoanApprovalRequestDTO dto) {
        adminService.processLoan(loanId, adminId, dto);
        return ResponseEntity.ok().build();
    }
}
