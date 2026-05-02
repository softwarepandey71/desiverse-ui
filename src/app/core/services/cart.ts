import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = 'http://localhost:8080';

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  private drawer = new BehaviorSubject<boolean>(false);
  drawer$ = this.drawer.asObservable();
  items:any=[];

  constructor(private http: HttpClient) { }

  addToCart(productId: number) {
    return this.http.post(
      `${this.baseUrl}/api/cart/add?userId=1&productId=${productId}`,
      {}
    );
  }

  getCart() {
    return this.http.get<any[]>(
      `${this.baseUrl}/api/cart/1`
    );
  }

  updateQty(productId: number, qty: number) {
    return this.http.put(
      `${this.baseUrl}/api/cart/update?userId=1&productId=${productId}&qty=${qty}`,
      {}
    );
  }

  removeFromCart(productId: number) {
    return this.http.delete(
      `${this.baseUrl}/api/cart/remove?userId=1&productId=${productId}`
    );
  }

  // 🔥 count update
  updateCartCount(count: number) {
    this.cartCount.next(count);
  }

  openDrawer() {
    this.drawer.next(true);
  }

  closeDrawer() {
    this.drawer.next(false);
  }

  clear() {
  // frontend clear
  this.items = [];
  this.cartCount.next(0);

  // optional backend call
  this.http.delete(`${this.baseUrl}/api/cart/clear`)
    .subscribe({
      error: () => console.log('backend clear failed')
    });
}
}