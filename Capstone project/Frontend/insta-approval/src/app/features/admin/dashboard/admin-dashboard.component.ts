import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../admin.service';
import { LoanApplicationResponse } from '../../../core/models/loan-application-response';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  pendingLoans: (LoanApplicationResponse & { adminRemarks?: string })[] = [];
  loading = true;
  errorMessage = '';

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadPendingLoans();
  }

  loadPendingLoans() {
    this.loading = true;
    this.adminService.getPendingLoans().subscribe({
      next: loans => {
        // Add adminRemarks prop for each loan row for binding to textarea
        this.pendingLoans = loans.map(loan => ({ ...loan, adminRemarks: '' }));
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Failed to load pending loans';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  approveLoan(loan: any) {
    const remarks = loan.adminRemarks?.trim() || 'Approved by admin';
    this.adminService.approveLoan(loan.applicationId, remarks).subscribe({
      next: () => {
        alert('Loan approved successfully!');
        this.loadPendingLoans();
      },
      error: () => {
        alert('Error approving loan.');
      }
    });
  }

  rejectLoan(loan: any) {
    const remarks = loan.adminRemarks?.trim();
    if (!remarks) {
      alert('Remarks are required to reject a loan.');
      return;
    }
    this.adminService.rejectLoan(loan.applicationId, remarks).subscribe({
      next: () => {
        alert('Loan rejected.');
        this.loadPendingLoans();
      },
      error: () => {
        alert('Error rejecting loan.');
      }
    });
  }
}