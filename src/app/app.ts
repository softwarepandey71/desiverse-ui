import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { MiniCart } from './features/cart/mini-cart/mini-cart';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar,MiniCart],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('desiverse-ui');
}
