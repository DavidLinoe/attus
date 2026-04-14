import { Component, OnInit } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { Router } from '@angular/router';
import { NavigationState } from '../navbar/navbar.state';
export interface SideUrls {
  label: string;
  url: string;
}
@Component({
  selector: 'attus-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [MatList, MatListItem],
})
export class SidebarComponent implements OnInit {
  public sideUrls: SideUrls[] = [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'Users',
      url: '/users',
    },
    {
      label: 'Cart',
      url: '/cart',
    },
    {
      label: 'Person',
      url: '/person',
    },
    {
      label: 'Todo-List',
      url: '/todo',
    },
  ];
  
  constructor(
    public router: Router,
    public navigationState: NavigationState,
  ) {}

  ngOnInit(): void {
    this.navigationState.navbarHeader.next(
      this.sideUrls.find((url) => url.url === this.router.url)?.url || '',
    );
  }
}
