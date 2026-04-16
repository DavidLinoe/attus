import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewUserForm } from '../../models/users.models';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
//*exercicio 4.1

@Component({
  selector: 'attus-new-user-modal',
  templateUrl: './newUserModal.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  styleUrl: './newUserModal.component.css',
})
export class NewUserModalComponent {
  private data = inject<{ form: FormGroup }>(MAT_DIALOG_DATA);
  newUsersForm = this.data.form;

  onSubmit = new EventEmitter<NewUserForm>();

  submit() {
    if (this.newUsersForm.valid) {
      this.onSubmit.emit(this.newUsersForm.value);
    }
  }
}
