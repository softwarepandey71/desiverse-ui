import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  templateUrl: './orders.html'
})
export class Orders implements OnInit {

  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/orders`)
      .subscribe(res => this.orders = res);
  }
}