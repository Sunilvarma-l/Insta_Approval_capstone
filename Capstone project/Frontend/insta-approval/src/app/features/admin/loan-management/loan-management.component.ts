import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../admin.service';
import { LoanApplicationResponse } from '../../../core/models/loan-application-response';

@Component({
  selector: 'app-loan-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loan-management.component.html',
  styleUrls: ['./loan-management.component.css']
})
export class LoanManagementComponent {
  @Input() loan!: LoanApplicationResponse;
  @Output() onDecision = new EventEmitter<void>();

  remarks: string = '';
  loadingApprove = false;
  loadingReject = false;

  constructor(private adminService: AdminService) {}

  approveLoan() {
    this.loadingApprove = true;
    this.adminService.approveLoan(this.loan.applicationId, this.remarks).subscribe({
      next: () => {
        this.loadingApprove = false;
        this.onDecision.emit();
      },
      error: () => {
        this.loadingApprove = false;
        alert('Error approving loan');
      }
    });
  }

  rejectLoan() {
    if (!this.remarks.trim()) {
      alert('Remarks are required to reject a loan');
      return;
    }
    this.loadingReject = true;
    this.adminService.rejectLoan(this.loan.applicationId, this.remarks).subscribe({
      next: () => {
        this.loadingReject = false;
        this.onDecision.emit();
      },
      error: () => {
        this.loadingReject = false;
        alert('Error rejecting loan');
      }
    });
  }
}