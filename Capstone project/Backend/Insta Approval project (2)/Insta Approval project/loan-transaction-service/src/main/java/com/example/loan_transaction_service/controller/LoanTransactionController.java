package com.example.loan_transaction_service.controller;

import com.example.loan_transaction_service.dto.LoanApplicationRequestDTO;
import com.example.loan_transaction_service.dto.LoanApplicationResponseDTO;
import com.example.loan_transaction_service.service.LoanApplicationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/v1/loans")
public class LoanTransactionController {

    @Autowired
    private LoanApplicationService loanApplicationService;

    @PostMapping("/apply")
    public ResponseEntity<LoanApplicationResponseDTO> applyLoan(@Valid @RequestBody LoanApplicationRequestDTO dto) {
        return ResponseEntity.ok(loanApplicationService.applyLoan(dto));
    }

    @GetMapping("/status/{loanId}")
    public ResponseEntity<LoanApplicationResponseDTO> getLoanStatus(@PathVariable Long loanId) {
        return ResponseEntity.ok(loanApplicationService.getLoanStatus(loanId));
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<LoanApplicationResponseDTO>> getLoansByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(loanApplicationService.getLoansByCustomer(customerId));
    }

    @DeleteMapping("/cancel/{loanId}")
    public ResponseEntity<Void> cancelLoan(@PathVariable Long loanId) {
        loanApplicationService.cancelLoan(loanId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{loanId}")
    public ResponseEntity<LoanApplicationResponseDTO> updateLoan(
            @PathVariable Long loanId,
            @Valid @RequestBody LoanApplicationRequestDTO dto) {
        return ResponseEntity.ok(loanApplicationService.updateLoan(loanId, dto));
    }
}
