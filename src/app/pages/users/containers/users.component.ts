import { Component } from '@angular/core';
import { UsersListComponent } from '../components/usersList/usersList.component';
import { UsersList } from '../models/users.models';
import { UsersApi } from '../api/users.api';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [UsersListComponent, MatToolbar, MatIconModule, MatFormFieldModule, MatInputModule],
  providers: [UsersApi],
})
export class UsersComponent {
  users: UsersList[] = [];

  constructor(private usersApiService: UsersApi) {
    this.users = this.usersApiService.getUsers();
  }
}
