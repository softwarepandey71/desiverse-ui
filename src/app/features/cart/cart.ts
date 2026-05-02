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

  constructor(private cartService: CartService,private router: Router) {}

ngOnInit() {
  this.loadCart();
}

loadCart() {
  this.cartService.getCart().subscribe(res => {
    console.log("result ::",res);
    this.items = res;
    // 🔥 update header count
      this.cartService.updateCartCount(res.length);
  });
}

remove(id: number) {
  this.cartService.removeFromCart(id).subscribe(() => {
    this.loadCart();
  });
}

increase(item: any) {
  item.quantity = (item.quantity || 1) + 1;
}

decrease(item: any) {
  if ((item.quantity || 1) > 1) {
    item.quantity--;
  }
}

total() {
  return this.items.reduce((sum, i) =>
    sum + ((i.price || 0) * (i.quantity || 1)), 0);
}

checkout() {
  this.router.navigate(['/checkout'], {
    state: { total: this.total() }
  });
}
}