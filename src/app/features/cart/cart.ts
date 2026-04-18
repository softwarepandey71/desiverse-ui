import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html'
})
export class Cart {

  items: any[] = [];

  constructor(private cart: CartService, private router: Router) {
    this.items = this.cart.getCart();
  }

  remove(id: number) {
    this.cart.remove(id);
    this.items = this.cart.getCart();
  }

  total() {
    return this.cart.total();
  }

  checkout() {
    this.router.navigateByUrl('/checkout');
  }
}