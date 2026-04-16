import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { routes } from './app.routes';
import { todoReducer } from './pages/todo/store/todo.reducer';
import { TodoEffects } from './pages/todo/store/todo.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({ todos: todoReducer }),
    provideEffects([TodoEffects]),
  ],
};
