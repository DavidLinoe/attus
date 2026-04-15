import { Component, input } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { Router } from '@angular/router';
export interface SideUrls {
  label: string;
  url: string;
}
@Component({
  selector: 'attus-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [MatList, MatListItem],
})
export class SidebarComponent {
  sideUrls = input.required<SideUrls[]>();
  constructor(public router: Router) {}
}
