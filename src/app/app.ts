import { Component, signal } from '@angular/core';
import { NavigationComponent } from './layout/navigation/containers/navigation.component';

@Component({
  selector: 'app-root',
  imports: [NavigationComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('attus');
}
