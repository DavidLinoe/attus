import { Component, input, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { SideUrls } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { NavigationState } from './navbar.state';

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

  constructor(
    private formBuilder: FormBuilder,
    public navigationState: NavigationState,
  ) {
    this.filterUsersForm = this.formBuilder.group({
      name: '',
    });

    this.filterUsersForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => null);
  }
}
