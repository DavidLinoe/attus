import { describe, it, expect } from 'vitest';
import { todoReducer } from './todo.reducer';
import { loadTodos, loadTodosError, loadTodosSuccess, toggleTodoComplete } from './todo.actions';
import { TodoState } from '../models/todo.models';

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

const mockTodos = [
  { id: 1, title: 'Estudar NgRx', completed: false },
  { id: 2, title: 'Implementar testes', completed: true },
];

describe('todoReducer', () => {
  it('deve retornar o estado inicial', () => {
    const state = todoReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  describe('loadTodos', () => {
    it('deve ativar loading e limpar o erro', () => {
      const state = todoReducer({ ...initialState, error: 'erro anterior' }, loadTodos());
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('não deve alterar a lista de todos', () => {
      const state = todoReducer({ ...initialState, todos: mockTodos }, loadTodos());
      expect(state.todos).toEqual(mockTodos);
    });
  });

  describe('loadTodosSuccess', () => {
    it('deve popular a lista e desativar loading', () => {
      const state = todoReducer(
        { ...initialState, loading: true },
        loadTodosSuccess({ todos: mockTodos }),
      );
      expect(state.todos).toEqual(mockTodos);
      expect(state.loading).toBe(false);
    });

    it('não deve alterar o erro', () => {
      const state = todoReducer(initialState, loadTodosSuccess({ todos: mockTodos }));
      expect(state.error).toBeNull();
    });
  });

  describe('loadTodosError', () => {
    it('deve registrar o erro e desativar loading', () => {
      const state = todoReducer(
        { ...initialState, loading: true },
        loadTodosError({ error: 'Falha na requisição' }),
      );
      expect(state.error).toBe('Falha na requisição');
      expect(state.loading).toBe(false);
    });

    it('não deve alterar a lista de todos', () => {
      const state = todoReducer(
        { ...initialState, todos: mockTodos },
        loadTodosError({ error: 'erro' }),
      );
      expect(state.todos).toEqual(mockTodos);
    });
  });

  describe('toggleTodoComplete', () => {
    it('deve inverter completed do todo correspondente', () => {
      const state = todoReducer(
        { ...initialState, todos: mockTodos },
        toggleTodoComplete({ id: 1 }),
      );
      expect(state.todos.find((t) => t.id === 1)?.completed).toBe(true);
    });

    it('não deve alterar outros todos', () => {
      const state = todoReducer(
        { ...initialState, todos: mockTodos },
        toggleTodoComplete({ id: 1 }),
      );
      expect(state.todos.find((t) => t.id === 2)?.completed).toBe(true);
    });

    it('deve manter imutabilidade — retornar novo array', () => {
      const before = { ...initialState, todos: mockTodos };
      const after = todoReducer(before, toggleTodoComplete({ id: 1 }));
      expect(after.todos).not.toBe(before.todos);
    });

    it('deve ignorar id inexistente sem alterar estado', () => {
      const state = todoReducer(
        { ...initialState, todos: mockTodos },
        toggleTodoComplete({ id: 99 }),
      );
      expect(state.todos).toEqual(mockTodos);
    });
  });
});
