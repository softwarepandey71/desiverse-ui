import { Component } from '@angular/core';
import { Product } from '../../core/services/product';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist {
  wishlistItems: any[] = [];
  constructor(private productService:Product){}

ngOnInit() {
  this.loadWishlist();
}

loadWishlist() {
  this.productService.getWishlistDetails()
    .subscribe((data: any) => {
      this.wishlistItems = data;
    });
}

remove(productId: number) {
  this.productService.removeFromWishlist(productId)
    .subscribe(() => this.loadWishlist());
}
}
