import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { TodoEffects } from './todo.effects';
import { loadTodos, loadTodosError, loadTodosSuccess } from './todo.actions';
import { TodoApi } from '../apis/todo.api';
import { Todo } from '../models/todo.models';

const mockTodos: Todo[] = [
  { id: 1, title: 'Estudar NgRx', completed: false },
  { id: 2, title: 'Implementar testes', completed: true },
];

describe('TodoEffects', () => {
  let effects: TodoEffects;
  let actions$: Observable<unknown>;
  let todoApiMock: Partial<TodoApi>;

  beforeEach(() => {
    todoApiMock = {
      getAll: vi.fn().mockReturnValue(of(mockTodos)),
    };

    TestBed.configureTestingModule({
      providers: [
        TodoEffects,
        provideMockActions(() => actions$),
        { provide: TodoApi, useValue: todoApiMock },
      ],
    });

    effects = TestBed.inject(TodoEffects);
  });

  describe('loadTodos$', () => {
    it('deve despachar loadTodosSuccess com os dados retornados', () => {
      actions$ = of(loadTodos());

      effects.loadTodos$.subscribe((action) => {
        expect(action).toEqual(loadTodosSuccess({ todos: mockTodos }));
      });
    });

    it('deve despachar loadTodosError quando a API falha', () => {
      const erro = new Error('Erro de rede');
      vi.mocked(todoApiMock.getAll!).mockReturnValue(throwError(() => erro));

      actions$ = of(loadTodos());

      effects.loadTodos$.subscribe((action) => {
        expect(action).toEqual(loadTodosError({ error: 'Erro de rede' }));
      });
    });

    it('deve chamar todoApi.getAll ao receber loadTodos', () => {
      actions$ = of(loadTodos());

      effects.loadTodos$.subscribe();

      expect(todoApiMock.getAll).toHaveBeenCalledTimes(1);
    });

    it('não deve reagir a outras actions', () => {
      const spy = vi.fn();
      actions$ = of(loadTodosSuccess({ todos: [] }));

      effects.loadTodos$.subscribe(spy);

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
