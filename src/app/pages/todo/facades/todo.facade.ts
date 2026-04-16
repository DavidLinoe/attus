import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  loadTodos,
  loadTodosError,
  loadTodosSuccess,
  toggleTodoComplete,
} from '../store/todo.actions';
import { selectAllTodos, selectError, selectLoading } from '../store/todo.selectors';
import { Todo } from '../models/todo.models';

@Injectable()
export class TodoFacade {
  todoStore = inject(Store);
  todos$ = this.todoStore.select(selectAllTodos);
  loading$ = this.todoStore.select(selectLoading);
  error$ = this.todoStore.select(selectError);

  getAll() {
    this.todoStore.dispatch(loadTodos());
  }
  getAllConcluded(todos: Todo[]) {
    this.todoStore.dispatch(loadTodosSuccess({ todos }));
  }
  getAllUnConcluded(error: string) {
    this.todoStore.dispatch(loadTodosError({ error }));
  }
  toggle(id: number) {
    this.todoStore.dispatch(toggleTodoComplete({ id }));
  }
}
