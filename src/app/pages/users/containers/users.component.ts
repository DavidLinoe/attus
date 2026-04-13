import { Component } from '@angular/core';
import { UsersListComponent } from '../components/usersList/usersList.component';
import { UsersFilter, UsersList } from '../models/users.models';
import { UsersApi } from '../api/users.api';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersListComponent,
    MatToolbar,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [UsersApi],
})
export class UsersComponent {
  filterUsersForm!: FormGroup;

  users: UsersList[] = [];

  constructor(
    private usersApiService: UsersApi,
    private formBuilder: FormBuilder,
  ) {
    this.filterUsersForm = this.formBuilder.group({
      name: '',
    });
    this.filterUsersForm.valueChanges.subscribe((filter: UsersFilter) => {
      this.users = this.usersApiService.getUsers(filter);
    });
    this.filterUsersForm.enable();
  }
}
