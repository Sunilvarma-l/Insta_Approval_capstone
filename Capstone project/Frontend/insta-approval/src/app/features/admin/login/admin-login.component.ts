import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  errorMessage = '';

  private readonly defaultAdminEmail = 'admin@example.com';
  private readonly defaultAdminPassword = 'admin';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [this.defaultAdminEmail, [Validators.required, Validators.email]],
      password: [this.defaultAdminPassword, Validators.required]
    });
  }

  onLogin() {
    this.errorMessage = '';
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    if (email === this.defaultAdminEmail && password === this.defaultAdminPassword) {
      localStorage.setItem('adminId', '1');  // store default admin ID
      this.loading = false;
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.loading = false;
      this.errorMessage = 'Invalid admin credentials. Please use default admin account.';
    }
  }
}
