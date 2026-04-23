import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class Product {

  private baseUrl = `${environment.apiUrl}/products`;
  private wishlistUrl = `${environment.apiUrl}`;
  private reviewUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.baseUrl);
  }

  addProduct(product: any) {
  return this.http.post(`${this.baseUrl}`, product);
}

addToCart(productId: number) {
  return this.http.post(`${this.baseUrl}/api/cart`, {
    productId,
    userId: 1,
    quantity: 1
  });
}

addToWishlist(productId: number) {
  return this.http.post(`${this.wishlistUrl}/api/wishlist`, {
    productId,
    userId: 1
  });
}

getReviews(productId: number) {
  return this.http.get(`${this.reviewUrl}/api/reviews/product/${productId}`);
}

addReview(data: any) {
  return this.http.post(`${this.reviewUrl}/api/reviews`, data);
}


getWishlist() {
  return this.http.get(`${this.wishlistUrl}/api/wishlist/1`);
}

removeFromWishlist(productId: number) {
  return this.http.delete(`${this.wishlistUrl}/api/wishlist/remove?userId=1&productId=${productId}`);
}

getWishlistDetails() {
  return this.http.get(`${this.wishlistUrl}/api/wishlist/details/1`);
}
}