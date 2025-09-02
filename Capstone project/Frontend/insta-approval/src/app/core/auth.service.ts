import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

export interface LoginResponse {
  token: string;
  customerId: number;  // Added customerId to login response
}

export interface CustomerResponseDTO {
  customerId: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  dateOfBirth?: string;
  cibilScore?: number;
  registrationDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:1111/api/v1/customers';

  constructor(private http: HttpClient,private tokenStorage: TokenStorageService) {}

  login(data: any): Observable<LoginResponse> {
    // Your backend login must return token and customerId together
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, data);
  }

getCustomerProfile(id: number) {
  const token = this.tokenStorage.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<CustomerResponseDTO>(`${this.baseUrl}/${id}`, { headers });
}
  register(data: any): Observable<CustomerResponseDTO> {
    return this.http.post<CustomerResponseDTO>(`${this.baseUrl}/register`, data);
  }
}
