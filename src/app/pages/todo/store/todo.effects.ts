import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { loadTodos, loadTodosError, loadTodosSuccess } from './todo.actions';
import { TodoApi } from '../apis/todo.api';

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);
  private todoApi = inject(TodoApi);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        this.todoApi.getAll().pipe(
          map((todos) => loadTodosSuccess({ todos })),
          catchError((error) => of(loadTodosError({ error: error.message }))),
        ),
      ),
    ),
  );
}
