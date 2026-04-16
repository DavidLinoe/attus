import { CommonModule } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';

interface CartItem {
  name: string;
  price: number;
  amount: number;
}

@Component({
  selector: 'attus-cart-list',
  templateUrl: './cart-list.component.html',
  imports: [CommonModule],
  styleUrl: './cart-list.component.css',
})
export class CartListComponent {
  public total = output<number>();

  public count = signal<number>(0);
  public list = signal<CartItem[]>([{ name: 'Item 1', price: 10, amount: 10 }]);
  public computed = signal<number>(0);

  addCount() {
    this.count.set(this.count() + 1);
  }

  addItem(item: CartItem) {
    this.list.set([...this.list(), { ...item }]);
  }

  removeItem(item: CartItem) {
    this.list.set([...this.list(), { ...item }]);
  }

  public conditionalCount = computed(() => {
    return this.list().map((item: CartItem) => {
      item.amount * item.price;
    });
  });
}
