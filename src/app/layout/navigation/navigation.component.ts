import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';

@Component({
  selector: 'attus-navigation',
  templateUrl: './navigation.component.html',
  imports: [
    RouterOutlet,
    SidebarComponent,
    NavbarComponent,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
  ],
})
export class NavigationComponent {
  public activePage: string = '';

  constructor() {}

 

}
