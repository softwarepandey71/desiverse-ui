import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {

  private key = 'cart';

  getCart() {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  addToCart(product: any) {
    const cart = this.getCart();

    const existing = cart.find((p: any) => p.id === product.id);

    if (existing) {
      existing.qty++;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem(this.key, JSON.stringify(cart));
  }

  remove(id: number) {
    const cart = this.getCart().filter((p: any) => p.id !== id);
    localStorage.setItem(this.key, JSON.stringify(cart));
  }

  clear() {
    localStorage.removeItem(this.key);
  }

  total() {
    return this.getCart()
      .reduce((sum: number, p: any) => sum + p.price * p.qty, 0);
  }
}