import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  get<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(url, { headers });
  }

  post<T>(url: string, data: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(url, data, { headers });
  }

  put<T>(url: string, data: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(url, data, { headers });
  }

  delete<T>(url: string, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(url, { headers });
  }
}
