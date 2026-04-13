import { Component, OnDestroy } from '@angular/core';
import { UsersListComponent } from '../components/usersList/usersList.component';
import { UsersFilter, UsersList } from '../models/users.models';
import { UsersApi } from '../api/users.api';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime } from 'rxjs';
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
  providers: [ApiService,UsersApi],
})
export class UsersComponent implements OnDestroy {
  filterUsersForm!: FormGroup;

  public users: UsersList[] = [];
  private formSubscription;

  constructor(
    private usersApiService: UsersApi,
    private formBuilder: FormBuilder,
  ) {
    this.filterUsersForm = this.formBuilder.group({
      name: '',
    });

    this.formSubscription = this.filterUsersForm.valueChanges.subscribe((filter: UsersFilter) => {
      this.usersApiService.getUsers(filter).subscribe((users) => (this.users = users));
    });

    this.filterUsersForm.enable();
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
