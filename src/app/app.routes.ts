import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/containers/users.component';
import { HomeComponent } from './pages/home/containers/home.component';
import { PersonComponent } from './pages/person/containers/person.component';
import { TodoComponent } from './pages/todo/containers/todo.component';
import { CartComponent } from './pages/cart/containers/cart.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'todo',
    component: TodoComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'person',
    component: PersonComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
