import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../core/services/product';
import { CartService } from '../../../core/services/cart';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html'
})
export class ProductList implements OnInit {
  wishlistMap: any = {};

  products: any[] = [
    {
      id: 1,
      name: 'Green Cotton Saree',
      price: 1499,
      oldPrice: 5319,
      category: 'Saree',
      type: 'Casual',
      fabric: 'Cotton',
      color: 'Green',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'
    },
    {
      id: 2,
      name: 'Red Silk Wedding Saree',
      price: 599,
      oldPrice: 1924,
      category: 'Silk',
      type: 'Wedding',
      fabric: 'Silk',
      color: 'Red',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'
    },
    {
      id: 3,
      name: 'Red Silk Wedding Saree',
      price: 599,
      oldPrice: 1924,
      category: 'Silk',
      type: 'Wedding',
      fabric: 'Silk',
      color: 'Red',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'
    },
    {
      id: 4,
      name: 'Red Silk Wedding Saree',
      price: 599,
      oldPrice: 1924,
      category: 'Silk',
      type: 'Wedding',
      fabric: 'Silk',
      color: 'Red',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'
    },
    {
      id: 5,
      name: 'Red Silk Wedding Saree',
      price: 599,
      oldPrice: 1924,
      category: 'Silk',
      type: 'Wedding',
      fabric: 'Silk',
      color: 'Red',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'
    },
    {
      id: 6,
      name: 'Red Silk Wedding Saree',
      price: 599,
      oldPrice: 1924,
      category: 'Silk',
      type: 'Wedding',
      fabric: 'Silk',
      color: 'Red',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'
    },
    {
      id: 7,
      name: 'Red Silk Wedding Saree',
      price: 599,
      oldPrice: 1924,
      category: 'Silk',
      type: 'Wedding',
      fabric: 'Silk',
      color: 'Red',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c'
    }
  ];;
  filteredProducts: any[] = [];
  selectedColors: string[] = [];
  selectedTypes: string[] = [];
  selectedFabrics: string[] = [];

  selectedDiscount: number | null = null;
  sortType = '';
  minPrice: number = 0;
  maxPrice = 5000;
  selectedCategories: string[] = [];
  searchText = '';
  searchTimeout: any;

  page = 1;
  pageSize = 8;


  constructor(private productService: Product, private cartService: CartService, private router: Router) { }

  ngOnInit() {

    // this.productService.getAll().subscribe(res => {
    //   this.products = res.filter(p => p.approved);
    //   this.applyFilters();
    // });
    this.productService.getWishlist().subscribe((data: any) => {
      data.forEach((item: any) => {
        this.wishlistMap[item.productId] = true;
      });
    });
    // this.loadWishlist();

    this.applyFilters();
  }

  getDiscount(p: any): number {
    return Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
  }

  applyFilters() {
    let data = [...this.products];

    // Price
    data = data.filter(p => p.price <= this.maxPrice);

    if (this.searchText) {
      data = data.filter(p =>
        p.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    // Discount
    if (this.selectedDiscount) {
      data = data.filter(p =>
        this.getDiscount(p) >= this.selectedDiscount!
      );
    }

    // Category
    if (this.selectedCategories.length) {
      data = data.filter(p =>
        this.selectedCategories.includes(p.category)
      );
    }

    // Type
    if (this.selectedTypes.length) {
      data = data.filter(p =>
        this.selectedTypes.includes(p.type)
      );
    }

    // Fabric
    if (this.selectedFabrics.length) {
      data = data.filter(p =>
        this.selectedFabrics.includes(p.fabric)
      );
    }

    // 🔥 COLOR
    if (this.selectedColors.length) {
      data = data.filter(p =>
        this.selectedColors.includes(p.color)
      );
    }

    // Sorting
    if (this.sortType === 'low') {
      data.sort((a, b) => a.price - b.price);
    }

    if (this.sortType === 'high') {
      data.sort((a, b) => b.price - a.price);
    }

    this.filteredProducts = data;
  }

  get paginated() {
    const start = (this.page - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  totalPages() {
    return Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  addToCart(p: any) {
    this.cartService.addToCart(p);
    alert('Added to cart');
  }

  toggleCategory(category: string, event: any) {
    if (event.target.checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories =
        this.selectedCategories.filter(c => c !== category);
    }
    this.applyFilters();
  }

  toggleColor(color: string) {
    if (this.selectedColors.includes(color)) {
      this.selectedColors =
        this.selectedColors.filter(c => c !== color);
    } else {
      this.selectedColors.push(color);
    }
    this.applyFilters();
  }

  toggleType(type: string, event: any) {
    if (event.target.checked) {
      this.selectedTypes.push(type);
    } else {
      this.selectedTypes =
        this.selectedTypes.filter(t => t !== type);
    }
    this.applyFilters();
  }

  toggleFabric(fabric: string, event: any) {
    if (event.target.checked) {
      this.selectedFabrics.push(fabric);
    } else {
      this.selectedFabrics =
        this.selectedFabrics.filter(f => f !== fabric);
    }
    this.applyFilters();
  }

  onSearch(event: any) {
    this.searchText = event.target.value;

    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this.applyFilters();
    }, 500); // 🔥 debounce time
  }

  goToDetail(id: number | undefined) {
    if (!id) {
      console.error("Invalid product id:", id);
      return;
    }

    this.router.navigate(['/product', id]);
  }

  toggleWishlist(productId: number) {

  // 🔥 UI instant toggle
  this.wishlistMap[productId] = !this.wishlistMap[productId];

  if (this.wishlistMap[productId]) {
    this.productService.addToWishlist(productId).subscribe({
      error: () => {
        // rollback if API fails
        this.wishlistMap[productId] = false;
      }
    });
  } else {
    this.productService.removeFromWishlist(productId).subscribe({
      error: () => {
        this.wishlistMap[productId] = true;
      }
    });
  }
}

  resetFilters() {
    this.selectedDiscount = null;
    this.sortType = '';
    this.maxPrice = 5000;
    this.selectedCategories = [];
    this.applyFilters();
  }

  loadWishlist() {
  this.productService.getWishlistDetails()
    .subscribe((data: any) => {
      data.forEach((p: any) => {
        this.wishlistMap[p.id] = true;
      });
    });
}
}