import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NavbarStore {
  public navbarHeader = new BehaviorSubject<string>('');
  public search = new BehaviorSubject<string>('');
}
