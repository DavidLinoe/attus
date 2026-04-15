import { Component } from '@angular/core';
import { CartListComponent } from '../components/cart-list/cart-list.component';
@Component({
  templateUrl: './cart.component.html',
  imports: [CartListComponent],
})
export class CartComponent {
  count() {}
}
