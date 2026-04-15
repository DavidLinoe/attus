import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { NavbarState } from './navbar.state';

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
    MatLabel,
  ],
})
export class NavbarComponent {
  public filterUsersForm!: FormGroup;
  public onSideBarToggle = output<boolean>();
  public activePage = input<string>();
  public onSearch = output<string>();

  constructor(
    private formBuilder: FormBuilder,
    public navbarState: NavbarState,
  ) {
    this.filterUsersForm = this.formBuilder.group({
      search: '',
    });

    this.filterUsersForm.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => this.onSearch.emit(value.search));
  }
}
