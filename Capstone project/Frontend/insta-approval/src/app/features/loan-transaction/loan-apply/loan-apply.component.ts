import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LoanTransactionService } from '../loan-transaction.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-loan-apply',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loan-apply.component.html',
  styleUrls: ['./loan-apply.component.css']
})
export class LoanApplyComponent implements OnInit {
  loanForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  loading = false;
  isUpdateMode = false;
  loanIdToUpdate?: number;

  constructor(
    private fb: FormBuilder,
    private loanService: LoanTransactionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loanForm = this.fb.group({
      customerId: [{ value: '', disabled: true }, Validators.required], // Disabled to hide input, filled from localStorage
      loanAmount: ['', [Validators.required, Validators.min(1)]],
      // cibilScore: ['', [Validators.required, Validators.min(0), Validators.max(900)]], // Add if needed
      documents: this.fb.array([])  // FormArray for multiple document inputs
    });
  }

  ngOnInit() {
    const storedCustomerId = localStorage.getItem('customerId');
    if (storedCustomerId) {
      this.loanForm.patchValue({ customerId: +storedCustomerId });
    }

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isUpdateMode = true;
        this.loanIdToUpdate = +idParam;
        this.loadLoanForUpdate(this.loanIdToUpdate);
      } else {
        this.isUpdateMode = false;
      }
    });
  }

  get documents(): FormArray {
    return this.loanForm.get('documents') as FormArray;
  }

  addDocument() {
    this.documents.push(this.fb.group({
      documentId: ['', Validators.required],
      documentType: ['', Validators.required]
    }));
  }

  removeDocument(index: number) {
    this.documents.removeAt(index);
  }

  loadLoanForUpdate(id: number) {
    this.loading = true;
    this.loanService.getLoanStatus(id).subscribe({
      next: loan => {
        this.loading = false;

        // Patch form fields here
        this.loanForm.patchValue({
          loanAmount: loan.loanAmount,
          // cibilScore: loan.cibilScore  // uncomment if using
        });

        this.documents.clear();
        loan.documents?.forEach(doc => {
          this.documents.push(this.fb.group({
            documentId: [doc.documentId || '', Validators.required],
            documentType: [doc.documentType || '', Validators.required]
          }));
        });
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Failed to load loan data for update.';
      }
    });
  }

  onSubmit() {
    if (this.loanForm.invalid) {
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }
    this.loading = true;

    this.loanForm.get('customerId')?.enable();

    const formValue = this.loanForm.value;

    if (this.isUpdateMode && this.loanIdToUpdate) {
      this.loanService.updateLoan(this.loanIdToUpdate, formValue).subscribe({
        next: res => {
          this.successMessage = `Loan application updated successfully. ID: ${res.applicationId}`;
          this.errorMessage = '';
          this.loading = false;
          this.router.navigate(['/customer/dashboard']);
        },
        error: err => {
          this.errorMessage = err.error?.message || 'Update failed.';
          this.successMessage = '';
          this.loading = false;
        }
      });
    } else {
      this.loanService.applyLoan(formValue).subscribe({
        next: res => {
          this.successMessage = `Loan application submitted. ID: ${res.applicationId}`;
          this.errorMessage = '';
          this.loading = false;
          this.loanForm.reset();
          this.documents.clear();

          this.loanForm.get('customerId')?.disable();

          const storedCustomerId = localStorage.getItem('customerId');
          if (storedCustomerId) {
            this.loanForm.patchValue({ customerId: +storedCustomerId });
          }

          this.router.navigate(['/customer/dashboard']);
        },
        error: err => {
          this.errorMessage = err.error?.message || 'Submission failed.';
          this.successMessage = '';
          this.loading = false;
        }
      });
    }

    this.loanForm.get('customerId')?.disable();
  }
}
