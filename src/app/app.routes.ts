import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/containers/users.component';

export const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'todo',
    component: UsersComponent,
  },
  {
    path: 'cart',
    component: UsersComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
