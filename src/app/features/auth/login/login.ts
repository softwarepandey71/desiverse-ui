import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class Login {

  email = '';
  password = '';

  constructor(private auth: Auth, private router: Router) { }

  login() {
    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        console.log('LOGIN RESPONSE', res);
        alert('Login success');
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.log('LOGIN ERROR', err);
        alert('Invalid credentials');
      }
    });
  }
}