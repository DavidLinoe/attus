import { Component } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { Router } from '@angular/router';

@Component({
  selector: 'attus-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [MatList, MatListItem],
})
export class SidebarComponent {
  constructor(public router: Router) {}
}
