import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoanApplicationRequest } from '../../core/models/loan-application-request';
import { LoanApplicationResponse } from '../../core/models/loan-application-response';
import { TokenStorageService } from '../../core/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoanTransactionService {
  private baseUrl = 'http://localhost:3333/api/v1/loans';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenStorage.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  applyLoan(data: LoanApplicationRequest): Observable<LoanApplicationResponse> {
    const headers = this.getAuthHeaders();
    return this.http.post<LoanApplicationResponse>(`${this.baseUrl}/apply`, data, { headers });
  }

  getLoanStatus(loanId: number): Observable<LoanApplicationResponse> {
    const headers = this.getAuthHeaders();
    return this.http.get<LoanApplicationResponse>(`${this.baseUrl}/status/${loanId}`, { headers });
  }

  getLoansByCustomer(customerId: number): Observable<LoanApplicationResponse[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<LoanApplicationResponse[]>(`${this.baseUrl}/customer/${customerId}`, { headers });
  }

  cancelLoan(loanId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.baseUrl}/cancel/${loanId}`, { headers });
  }

  updateLoan(loanId: number, data: LoanApplicationRequest): Observable<LoanApplicationResponse> {
    const headers = this.getAuthHeaders();
    return this.http.put<LoanApplicationResponse>(`${this.baseUrl}/update/${loanId}`, data, { headers });
  }
}
