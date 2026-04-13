import { Component } from '@angular/core';
import { UsersListComponent } from '../components/usersList/usersList.component';
import { UsersList } from '../models/users.models';
import { UsersApi } from '../api/users.api';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [UsersListComponent],
  providers: [UsersApi],
})
export class UsersComponent {
  users: UsersList[] = [];

  constructor(private usersApiService: UsersApi) {
    this.users = this.usersApiService.getUsers();
  }
}
