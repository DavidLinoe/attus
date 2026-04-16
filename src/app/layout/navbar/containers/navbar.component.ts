import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatPrefix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NavbarStore } from '../store/navbar.store';

@Component({
  selector: 'attus-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [
    CommonModule,
    MatToolbar,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIcon,
    MatFormField,
    MatPrefix,
    MatButtonModule,
  ],
})
export class NavbarComponent {
  public filterUsersForm!: FormGroup;
  public onSideBarToggle = output<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    public navbarStore: NavbarStore,
  ) {
    this.filterUsersForm = this.formBuilder.group({
      search: '',
    });

    this.filterUsersForm.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((value) => this.navbarStore.search.next(value.search));
  }
}
