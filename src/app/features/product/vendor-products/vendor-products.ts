import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-vendor-products',
  standalone: true, // 🔥 VERY IMPORTANT
  imports: [CommonModule],
  templateUrl: './vendor-products.html',
  styleUrls: ['./vendor-products.css']
})
export class VendorProducts implements OnInit {

  private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient,private cd: ChangeDetectorRef) {}

  products$!: Observable<Product[]>;

ngOnInit() {
  this.products$ = this.http.get<Product[]>(`${this.baseUrl}/products/vendor`);
}
}