import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/containers/users.component';
import { HomeComponent } from './pages/home/containers/home.component';
import { PersonComponent } from './pages/person/containers/person.component';

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
    component: UsersComponent,
  },
  {
    path: 'cart',
    component: UsersComponent,
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
