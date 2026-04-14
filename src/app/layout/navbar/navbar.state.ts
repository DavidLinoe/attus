import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavigationState {
  public navbarHeader: BehaviorSubject<string> = new BehaviorSubject('');
}
