import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html'
})
export class ProductDetail implements OnInit {

  productId!: number;

  product: any;

  selectedImage: string = '';
  zoomStyle: any = {};
  relatedProducts = [];
  private baseUrl = `${environment.apiUrl}/admin`;

  constructor(private route: ActivatedRoute,private http: HttpClient) {}

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    // 🔥 DEMO DATA (later API se replace karna)
    this.product = {
      id: this.productId,
      name: 'Premium Silk Saree',
      price: 1999,
      oldPrice: 3999,
      description: 'Beautiful silk saree for weddings & festivals',
      images: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c',
        'https://images.unsplash.com/photo-1594736797933-d0c6a7c92c2c',
        'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8'
      ],
      fabric: 'Silk',
      color: 'Red',
      type: 'Kanjivaram'
    };

    this.selectedImage = this.product.images[0];
  }

  changeImage(img: string) {
    this.selectedImage = img;
  }

  // 🔍 Zoom Effect
  zoom(event: MouseEvent) {
    const rect = (event.target as HTMLElement).getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    this.zoomStyle = {
      'transform-origin': `${x}% ${y}%`,
      transform: 'scale(2)'
    };
  }

  resetZoom() {
    this.zoomStyle = {
      transform: 'scale(1)'
    };
  }

  getRelatedProducts(category: string) {
  return this.http.get(`${this.baseUrl}/api/products/related?category=${category}`);
}

  addToCart() {
    console.log('Added to cart:', this.product);
  }
  
}