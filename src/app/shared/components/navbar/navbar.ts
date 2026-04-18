import { CommonModule } from '@angular/common';
import { Component, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.html'
})
export class Navbar {

  menuOpen = signal(false);

  token = signal(localStorage.getItem('token'));
  role = signal(localStorage.getItem('role'));

  isLoggedIn = computed(() => !!this.token());

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  ngOnInit() {
  window.addEventListener('storage', () => {
    this.token.set(localStorage.getItem('token'));
    this.role.set(localStorage.getItem('role'));
  });
}

  logout() {
    localStorage.clear();
    this.token.set(null);
    this.role.set(null);
    this.router.navigateByUrl('/login');
  }
}