import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private baseUrl =  `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

   register(data: any) {
    console.log("register data :: ",data);
    return this.http.post(`${this.baseUrl}/register`, data,{ responseType: 'text' });
  }

  login(data: any) {
    console.log("token",data);
    return this.http.post<any>(`${this.baseUrl}/login`, data)
      .pipe(
        tap(res => {
          console.log("token",res);
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.role);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole() {
    return localStorage.getItem('role');
  }
}