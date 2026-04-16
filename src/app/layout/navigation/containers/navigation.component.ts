import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../navbar/containers/navbar.component';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { NavbarStore } from '../../navbar/store/navbar.store';
import { distinct, filter, Subscription } from 'rxjs';
import { SidebarComponent, SideUrls } from '../../sidebar/containers/sidebar.component';
import { SIDE_URLS } from '../models/navigation.models';

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
export class NavigationComponent implements OnInit, OnDestroy {
  public sideUrls: SideUrls[] = SIDE_URLS;

  private routerSubscription!: Subscription;

  constructor(
    public router: Router,
    public navbarStore: NavbarStore,
  ) {}

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(
        distinct(),
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe((route) => {
        console.log(route);
        this.navbarStore.navbarHeader.next(
          this.sideUrls.find((url) => url.url === route.url)?.label || '',
        );
      });
  }
  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
