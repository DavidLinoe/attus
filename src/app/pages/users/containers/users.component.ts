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
import { switchMap } from 'rxjs';
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
  providers: [ApiService, UsersApi],
})
export class UsersComponent {
  public filterUsersForm!: FormGroup;
  public newUsersForm!: FormGroup;
  readonly dialog = inject(MatDialog);
  public users: UsersList[] = [];

  constructor(
    private usersApiService: UsersApi,
    private formBuilder: FormBuilder,
  ) {
    this.filterUsersForm = this.formBuilder.group({
      name: '',
    });

    this.newUsersForm = this.formBuilder.group({
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
      .subscribe((users) => (this.users = users));

    this.filterUsersForm.enable();
  }

  openEditModal(event: UsersList) {
    console.log(event);
    const dialogRef = this.dialog.open(NewUserModalComponent, {
      width: '80vw',
      height: 'auto',
      maxWidth: '90vw',
      data: { form: this.newUsersForm },
    });

    dialogRef.componentInstance.onSubmit.subscribe((form: FormGroup) => {
      this.usersApiService.createUser(form.value).subscribe({
        next: (user: NewUserForm) => {
          console.log('salvando usuario', user);
          this.usersApiService.createUser(user);
          dialogRef.close();
        },
        error: (err: Error) => console.error('Erro ao salvar usuário:', err),
      });
    });
  }
}
