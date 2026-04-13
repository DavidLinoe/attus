import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UsersListComponent } from '../components/usersList/usersList.component';
import { UsersFilter, UsersList } from '../models/users.models';
import { UsersApi } from '../api/users.api';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { ApiService } from '../../../services/apiService.service';

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
  providers: [ApiService, UsersApi],
})
export class UsersComponent {
  public filterUsersForm!: FormGroup;
  public modalIsOpened: boolean = false;

  public users: UsersList[] = [];

  constructor(
    private usersApiService: UsersApi,
    private formBuilder: FormBuilder,
  ) {
    this.filterUsersForm = this.formBuilder.group({
      name: '',
    });

    this.filterUsersForm.valueChanges
      .pipe(
        switchMap((filter: UsersFilter) => this.usersApiService.getUsers(filter)),
        takeUntilDestroyed(),
      )
      .subscribe((users) => (this.users = users));

    this.filterUsersForm.enable();
  }

  openEditModal(event: UsersList) {
    console.log(event);
    this.modalIsOpened = !this.modalIsOpened;
  }
}
