import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html'
})
export class Checkout implements OnInit {

  address = '';
  city = '';
  pincode = '';

  items: any[] = [];
  total: number = 0;

  constructor(
    private cart: CartService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cart.getCart().subscribe((res: any[]) => {
      this.items = res;

      this.total = this.items.reduce((sum, i) =>
        sum + ((i.price || 0) * (i.quantity || 1)), 0);
    });
  }

  placeOrder() {

    if (!this.address || !this.city || !this.pincode) {
      alert('Please fill all details');
      return;
    }

    const order = {
      address: `${this.address}, ${this.city} - ${this.pincode}`,
      total: this.total,
      items: this.items.map(p => ({
        productId: p.id,
        name: p.name,
        price: p.price,
        qty: p.quantity || 1
      }))
    };

    this.http.post(`${environment.apiUrl}/orders`, order)
      .subscribe(() => {
        this.cart.clear();
        alert('Order placed successfully 🎉');
        this.router.navigateByUrl('/orders');
      });
  }
}