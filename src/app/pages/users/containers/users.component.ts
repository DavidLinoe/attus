import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UsersListComponent } from '../components/usersList/usersList.component';
import { NewUserForm, UsersFilter, UsersList } from '../models/users.models';
import { UsersApi } from '../api/users.api';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ApiService } from '../../../services/apiService.service';
import { NewUserModalComponent } from '../components/newUserModal/newUserModal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './users.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersListComponent,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  styleUrl: './users.component.css',
  providers: [ApiService, UsersApi],
})
export class UsersComponent {
  public filterUsersForm!: FormGroup;
  public newUsersForm!: FormGroup;
  readonly dialog = inject(MatDialog);
  public users = new BehaviorSubject<UsersList[]>([]);
  public users$ = this.users.asObservable();

  constructor(
    private usersApiService: UsersApi,
    private formBuilder: FormBuilder,
  ) {
    this.filterUsersForm = this.formBuilder.group({
      name: '',
    });

    this.newUsersForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      phoneType: ['', [Validators.required]],
    });

    this.filterUsersForm.valueChanges
      .pipe(
        switchMap((filter: UsersFilter) => this.usersApiService.getUsers(filter)),
        takeUntilDestroyed(),
      )
      .subscribe((users) => this.users.next(users));

    this.filterUsersForm.enable();
  }

  openUserModal(event?: UsersList) {
    if (event) {
      this.newUsersForm.patchValue(event);
    }

    const dialogRef = this.dialog.open(NewUserModalComponent, {
      width: '80vw',
      height: 'auto',
      maxWidth: '90vw',
      data: { form: this.newUsersForm },
    });

    if (event && event.id) {
      dialogRef.componentInstance.onSubmit.subscribe((user: NewUserForm) => {
        this.usersApiService.updateUser(user).subscribe((res) => {
          this.users.next(this.users.value.map((u) => (u.id === res.id ? { ...u, ...res } : u)));
          dialogRef.close();
          this.newUsersForm.reset();
        });
      });
    } else {
      dialogRef.componentInstance.onSubmit.subscribe((user: NewUserForm) => {
        this.usersApiService.createUser(user).subscribe((res) => {
          this.users.next([...this.users.value, { id: res.id!, name: res.name, email: res.email }]);
          dialogRef.close();
          this.newUsersForm.reset();
        });
      });
    }
  }
}
