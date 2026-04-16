import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  output,
  signal,
} from '@angular/core';
import { CartItem, MOCK_ITEMS_CART } from '../../models/cart.models';

@Component({
  selector: 'attus-cart-list',
  templateUrl: './cart-list.component.html',
  imports: [DecimalPipe],
  styleUrl: './cart-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartListComponent {
  public totalChange = output<number>();
  public list = signal<CartItem[]>([]);
  public loading = signal<boolean>(false);

  public total = computed(() =>
    this.list().reduce((sum, item) => sum + item.amount * item.price, 0),
  );

  constructor() {
    effect(() => {
      this.totalChange.emit(this.total());
    });
  }

  getAll() {
    this.loading.set(true);
    setTimeout(() => {
      this.list.set(MOCK_ITEMS_CART);
      this.loading.set(false);
    }, 800);
  }

  addItem(item: CartItem) {
    this.list.update((current) => [...current, { ...item }]);
  }

  removeItem(itemToRemove: CartItem) {
    this.list.update((current) => current.filter((item) => item.name !== itemToRemove.name));
  }
}
