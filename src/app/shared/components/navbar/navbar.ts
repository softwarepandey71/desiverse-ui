import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html'
})
export class Navbar {

  menuOpen = signal(false);

  token = signal(localStorage.getItem('token'));
  role = signal(localStorage.getItem('role'));

  isLoggedIn = computed(() => !!this.token());
  cartCount = 0;

  constructor(private router: Router, private cartService: CartService,public auth: Auth) { }

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  ngOnInit() {

    this.loadCount();

    // 🔥 live update
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
    window.addEventListener('storage', () => {
      this.token.set(localStorage.getItem('token'));
      this.role.set(localStorage.getItem('role'));
    });
  }

  logout() {
    localStorage.clear();
    this.token.set(null);
    this.role.set(null);
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  loadCount() {
    this.cartService.getCart().subscribe(res => {
      this.cartCount = res.length;
      this.cartService.updateCartCount(res.length);
    });
  }

  openCart(){
     this.cartService.openDrawer();
  }
}