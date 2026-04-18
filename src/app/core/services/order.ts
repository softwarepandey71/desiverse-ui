import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  // ✅ Get logged-in user orders
  getMyOrders() {
    return this.http.get<any[]>(this.baseUrl);
  }

  getAllOrders() {
  return this.http.get<any[]>(`${this.baseUrl}/all`);
}
}