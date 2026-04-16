import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo.models';

export const loadTodos = createAction('[Todo] Load Todos');

export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>()
);

export const loadTodosError = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: string }>()
);

export const toggleTodoComplete = createAction(
  '[Todo] Toggle Complete',
  props<{ id: number }>()
);
