import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UsersListComponent } from '../components/usersList/usersList.component';
import { NewUserForm, UsersList } from '../models/users.models';
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
import { BehaviorSubject, catchError, debounceTime, of, switchMap, tap } from 'rxjs';
import { ApiService } from '../../../services/apiService.service';
import { NewUserModalComponent } from '../components/newUserModal/newUserModal.component';
import { MatDialog } from '@angular/material/dialog';
import { NavbarState } from '../../../layout/navbar/navbar.state';

//*exercicio 4
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
  public newUsersForm!: FormGroup;
  readonly dialog = inject(MatDialog);
  public users = new BehaviorSubject<UsersList[]>([]);
  public users$ = this.users.asObservable();
  public loading = new BehaviorSubject<boolean>(false);
  public error = new BehaviorSubject<string | null>(null);

  constructor(
    private usersApiService: UsersApi,
    private formBuilder: FormBuilder,
    private navbarState: NavbarState,
  ) {
    this.newUsersForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)]],
      phoneType: ['', [Validators.required]],
    });

    this.navbarState.search
      .pipe(
        debounceTime(300),
        tap(() => this.loading.next(true)),
        switchMap((search) =>
          this.usersApiService.getUsers({ name: search }).pipe(
            catchError((err) => {
              this.error.next('Erro ao carregar usuários');
              return of([]);
            }),
          ),
        ),
        tap(() => this.loading.next(false)),
        takeUntilDestroyed(),
      )
      .subscribe((users) => this.users.next(users));
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
