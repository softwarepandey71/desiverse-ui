import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.html'
})
export class OrderHistory implements OnInit {

  orders: any[] = [];

  constructor(private service: OrderService) {}

  ngOnInit() {
    this.service.getMyOrders().subscribe(res => {
      this.orders = res;
    });
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'PLACED': return 'text-yellow-600';
      case 'SHIPPED': return 'text-blue-600';
      case 'DELIVERED': return 'text-green-600';
      default: return '';
    }
  }
}