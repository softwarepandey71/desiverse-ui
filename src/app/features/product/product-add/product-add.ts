import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/services/product';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-add.html'
})
export class ProductAdd {

  form: FormGroup;
  loading = false;
  product: any = {};

  constructor(
    private fb: FormBuilder,
    private productService: Product,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      imageUrl: ['']
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.productService.addProduct(this.form.value)
      .subscribe({
        next: () => {
          alert('Product Added ✅');
          this.router.navigateByUrl('/my-products');
        },
        error: () => {
          alert('Failed ❌');
          this.loading = false;
        }
      });
  }
}