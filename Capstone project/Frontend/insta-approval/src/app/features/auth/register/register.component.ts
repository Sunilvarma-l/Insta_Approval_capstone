import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';
import { NotificationService } from '../../../core/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      address: [''],
      dateOfBirth: ['', Validators.required],           // Added dateOfBirth field
      cibilScore: ['', [Validators.required, Validators.min(0), Validators.max(900)]],  // Added cibilScore field
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    const formValue = this.registerForm.value;
    const payload = {
      name: formValue.name,
      email: formValue.email,
      phone: formValue.mobile,
      address: formValue.address,
      dateOfBirth: formValue.dateOfBirth,    // Include dateOfBirth
      cibilScore: formValue.cibilScore,      // Include cibilScore
      password: formValue.password
    };
    this.authService.register(payload).subscribe({
      next: () => {
        this.notificationService.showSuccess('Registration successful! Redirecting to login.');
        this.router.navigate(['/login']);
      },
      error: err => {
        this.notificationService.showError(err.error.message || 'Registration failed');
        this.loading = false;
      },
      complete: () => this.loading = false
    });
  }
}
