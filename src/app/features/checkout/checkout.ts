import { Component } from '@angular/core';
import { CartService } from '../../core/services/cart';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  templateUrl: './checkout.html'
})
export class Checkout {

  address = '';

  constructor(
    private cart: CartService,
    private http: HttpClient,
    private router: Router
  ) {}

  placeOrder() {

  const order = {
    address: this.address,
    total: this.cart.total(),
    items: this.cart.getCart().map((p: any) => ({
      productId: p.id,
      name: p.name,
      price: p.price,
      qty: p.qty
    }))
  };

  this.http.post(`${environment.apiUrl}/orders`, order)
    .subscribe(() => {
      this.cart.clear();
      alert('Order placed!');
      this.router.navigateByUrl('/orders');
    });
}
}