import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanTransactionService } from '../../../features/loan-transaction/loan-transaction.service';
import { AuthService, CustomerResponseDTO } from '../../../core/auth.service';
import { LoanApplicationResponse } from '../../../core/models/loan-application-response';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  customerId?: number;
  customerProfile?: CustomerResponseDTO;
  loanApplications: LoanApplicationResponse[] = [];
  loading = true;

  constructor(
    private authService: AuthService,
    private loanService: LoanTransactionService,
    private changeDetector: ChangeDetectorRef,
    private ngZone: NgZone,
    private router: Router
  ) {}

  ngOnInit() {
    const custId = localStorage.getItem('customerId');
    if (!custId) {
      this.loading = false;
      return;
    }
    this.customerId = +custId;

    this.authService.getCustomerProfile(this.customerId).subscribe({
      next: profile => {
        this.ngZone.run(() => {
          this.customerProfile = profile;
          this.loadLoans();
        });
      },
      error: () => {
        this.ngZone.run(() => {
          this.loading = false;
        });
      }
    });
  }

  loadLoans() {
    if (!this.customerId) {
      this.loading = false;
      return;
    }
    this.loanService.getLoansByCustomer(this.customerId).subscribe({
      next: loans => {
        this.ngZone.run(() => {
          this.loanApplications = loans;
          this.loading = false;
          this.changeDetector.detectChanges();
        });
      },
      error: () => {
        this.ngZone.run(() => {
          this.loading = false;
          this.changeDetector.detectChanges();
        });
      }
    });
  }

  onUpdateLoan(loan: LoanApplicationResponse) {
    // Correct navigation to loan apply update path
    this.ngZone.run(() => {
      this.router.navigate(['/loan-apply', loan.applicationId]);
    });
  }

  onWithdrawLoan(loanId: number) {
    if (!confirm('Are you sure you want to withdraw this loan application?')) return;

    this.loanService.cancelLoan(loanId).subscribe({
      next: () => {
        alert('Loan application withdrawn successfully.');
        this.loadLoans();
      },
      error: () => {
        alert('Failed to withdraw loan application.');
      }
    });
  }
}
