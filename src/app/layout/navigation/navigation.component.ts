import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent, SideUrls } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { NavbarState } from '../navbar/navbar.state';
import { SIDE_URLS } from './models/navigation.models';
import { distinct, filter, Subscription,} from 'rxjs';

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
    public navbarState: NavbarState,
  ) {}

  onSearch(text: string) {
    console.log(text);
  }

  ngOnInit() {
    this.routerSubscription = this.router.events
      .pipe(
        distinct(),
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe((route) => {
        console.log(route);
        this.navbarState.navbarHeader.next(
          this.sideUrls.find((url) => url.url === route.url)?.label || '',
        );
      });
  }
  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
