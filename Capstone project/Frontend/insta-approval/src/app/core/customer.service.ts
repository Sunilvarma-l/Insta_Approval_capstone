import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://localhost:1111/api/v1/customers';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  getCustomerProfile(customerId: number): Observable<CustomerResponseDTO> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<CustomerResponseDTO>(`${this.apiUrl}/${customerId}`, { headers });
  }
}
