import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { OrderService } from '../../../../core/services/order';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-orders.html'
})
export class AdminOrders implements OnInit {

  orders: any[] = [];

  constructor(private http: HttpClient,private orderService: OrderService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.orderService.getAllOrders()
      .subscribe(res => this.orders = res);
  }

  updateStatus(id: number, status: string) {
    this.http.put(
      `${environment.apiUrl}/orders/${id}/status?status=${status}`,
      {}
    ).subscribe(() => this.load());
  }
}