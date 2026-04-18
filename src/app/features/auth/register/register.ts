import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html'
})
export class Register {

  email = '';
  password = '';
  role = 'USER';

  constructor(private auth: Auth, private router: Router) { }

  register() {
    this.auth.register({
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe({
      next: () => {
        alert('Registered successfully');
        this.router.navigateByUrl('/login');
      },
      error: () => alert('Register failed')
    });
  }
}