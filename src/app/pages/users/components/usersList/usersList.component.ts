import { Component, input, output } from '@angular/core';
import { UsersList } from '../../models/users.models';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

//*exercicio 4.1
@Component({
  selector: 'attus-users-list',
  templateUrl: './usersList.component.html',
  styleUrls: ['./usersList.component.css'],
  imports: [MatIcon, MatButtonModule],
})
export class UsersListComponent {
  users = input.required<UsersList[]>();
  openEditModal = output<UsersList>();
}
