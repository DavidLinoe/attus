import { createReducer, on } from '@ngrx/store';
import { TodoState } from '../models/todo.models';
import { loadTodos, loadTodosError, loadTodosSuccess, toggleTodoComplete } from './todo.actions';

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const todoReducer = createReducer(
  initialState,

  on(loadTodos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos,
    loading: false,
  })),

  on(loadTodosError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(toggleTodoComplete, (state, { id }) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    ),
  })),
);
