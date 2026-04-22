import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Admin {

  private api = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) { }

  getStats() {
    return this.http.get<any>(`${this.api}/stats`);
  }

  getRecentProducts() {
    return this.http.get<any[]>(`${this.api}/recent-products`);
  }

  getRecentUsers() {
    return this.http.get<any[]>(`${this.api}/recent-users`);
  }
}