import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'attus-new-user-modal',
  templateUrl: './newUserModal.component.html',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
})
export class NewUserModalComponent {}
