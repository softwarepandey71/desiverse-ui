import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './approve-products.html'
})
export class ApproveProducts implements OnInit {

  products: any[] = [];

  private api = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.http.get<any[]>(`${this.api}`).subscribe(res => {
      this.products = res.filter(p => !p.approved);
    });
  }

  approve(id: number) {
    this.http.put(`${this.api}/approve/${id}`, {}).subscribe(() => {
      this.loadProducts();
    });
  }
}