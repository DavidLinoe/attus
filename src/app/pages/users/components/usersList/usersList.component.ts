import { Component, input, output } from '@angular/core';
import { MatListItem, MatListItemIcon, MatNavList } from '@angular/material/list';
import { UsersList } from '../../models/users.models';
import { MatIcon } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'attus-users-list',
  templateUrl: './usersList.component.html',
  styleUrls: ['./usersList.component.css'],
  imports: [MatNavList, MatIcon, MatListItem, MatListItemIcon, MatGridListModule],
})
export class UsersListComponent {
  users = input.required<UsersList[]>();
  openEditModal = output<UsersList>();
}
