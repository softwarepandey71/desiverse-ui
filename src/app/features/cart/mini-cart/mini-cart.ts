import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart';

@Component({
  selector: 'app-mini-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mini-cart.html'
})
export class MiniCart implements OnInit {

  items: any[] = [];
  isOpen = false;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {

    // 🔥 listen drawer state
    this.cartService.drawer$.subscribe(val => {
      this.isOpen = val;

      if (val) {
        this.loadCart();
      }
    });
  }

  loadCart() {
  this.cartService.getCart().subscribe((res: any[]) => {

    this.items = res.map(item => ({
      ...item,
      name: item.name || 'Demo Saree',
      price: item.price || 999,
      image: item.image || 'https://picsum.photos/200'
    }));

  });
}

  close() {
    this.cartService.closeDrawer();
  }

  goToCart() {
    this.close();
    this.router.navigate(['/cart']);
  }

  checkout() {
    this.close();
    this.router.navigate(['/checkout']);
  }

  total() {
  return this.items.reduce((sum, i) =>
    sum + ((i.price || 0) * (i.quantity || 1)), 0);
  }
}