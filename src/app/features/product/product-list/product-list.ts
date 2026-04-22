import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../core/services/product';
import { CartService } from '../../../core/services/cart';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html'
})
export class ProductList implements OnInit {

  products: any[] = [];
  filtered: any[] = [];

  search = '';
  minPrice: number = 0;
  maxPrice: number = 100000;

  page = 1;
  pageSize = 8;

  constructor(private service: Product,private cartService: CartService) {}

  ngOnInit() {
    this.service.getAll().subscribe(res => {
      this.products = res.filter(p => p.approved);
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filtered = this.products.filter(p =>
      p.name.toLowerCase().includes(this.search.toLowerCase()) &&
      p.price >= this.minPrice &&
      p.price <= this.maxPrice
    );
  }

  get paginated() {
    const start = (this.page - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  totalPages() {
    return Math.ceil(this.filtered.length / this.pageSize);
  }

  addToCart(p: any) {
    this.cartService.addToCart(p);
    alert('Added to cart');
  }
}