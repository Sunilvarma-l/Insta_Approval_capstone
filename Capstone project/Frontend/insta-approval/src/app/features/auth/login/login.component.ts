import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginResponse, CustomerResponseDTO } from '../../../core/auth.service';
import { TokenStorageService } from '../../../core/token-storage.service';
import { NotificationService } from '../../../core/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
   this.authService.login(this.loginForm.value).subscribe({
  next: (res) => {
    this.tokenStorage.saveToken(res.token);

    // Defensive check for customerId presence before using toString()
    if (res.customerId !== undefined && res.customerId !== null) {
      localStorage.setItem('customerId', res.customerId.toString());

      this.authService.getCustomerProfile(res.customerId).subscribe({
        next: (profile) => {
          this.notificationService.showSuccess('Login successful!');
          this.router.navigate(['/customer/dashboard']);
        },
        error: () => {
          this.notificationService.showError('Failed to fetch user profile.');
          this.loading = false;
        }
      });
    } else {
      // Handle missing customerId gracefully
      this.notificationService.showError('Login successful but customerId is missing.');
      this.loading = false;
    }
  },
  error: (err) => {
    this.notificationService.showError(err.error?.message || 'Login failed');
    this.loading = false;
  }
});
  }
}