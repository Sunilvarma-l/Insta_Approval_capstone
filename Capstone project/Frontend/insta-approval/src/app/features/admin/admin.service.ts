import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanApplicationResponse } from '../../core/models/loan-application-response';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:3333/api/v1/admin/loans';

  constructor(private http: HttpClient) {}

  getPendingLoans(): Observable<LoanApplicationResponse[]> {
    return this.http.get<LoanApplicationResponse[]>(`${this.baseUrl}/pending`);
  }

  approveLoan(loanId: number, remarks?: string): Observable<void> {
    const adminId = localStorage.getItem('adminId') || '1';
    const payload = { action: 'APPROVE', remarks };
    return this.http.put<void>(`${this.baseUrl}/approve/${loanId}?adminId=${adminId}`, payload);
  }

  rejectLoan(loanId: number, remarks: string): Observable<void> {
    const adminId = localStorage.getItem('adminId') || '1';
    const payload = { action: 'REJECT', remarks };
    return this.http.put<void>(`${this.baseUrl}/reject/${loanId}?adminId=${adminId}`, payload);
  }
}
