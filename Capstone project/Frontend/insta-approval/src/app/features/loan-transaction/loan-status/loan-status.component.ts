import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoanTransactionService} from '../loan-transaction.service';
import { LoanApplicationResponse } from '../../../core/models/loan-application-response';

@Component({
  selector: 'app-loan-status',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loan-status.component.html',
  styleUrls: ['./loan-status.component.css']
})
export class LoanStatusComponent {
  loanId: number | null = null;
  loanStatus: LoanApplicationResponse | null = null;
  errorMessage = '';
  loading = false;

  constructor(private loanService: LoanTransactionService) {}

  fetchStatus() {
    if (!this.loanId) {
      this.errorMessage = 'Enter a loan ID';
      this.loanStatus = null;
      return;
    }
    this.loading = true;
    this.loanService.getLoanStatus(this.loanId).subscribe({
      next: status => {
        this.loanStatus = status;
        this.errorMessage = '';
        this.loading = false;
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Failed to fetch loan status';
        this.loanStatus = null;
        this.loading = false;
      }
    });
  }
}
