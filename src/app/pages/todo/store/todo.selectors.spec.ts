import { describe, it, expect } from 'vitest';
import { selectAllTodos, selectError, selectLoading } from './todo.selectors';
import { TodoState } from '../models/todo.models';

const mockTodos = [
  { id: 1, title: 'Estudar NgRx', completed: false },
  { id: 2, title: 'Implementar testes', completed: true },
  { id: 3, title: 'Revisar RxJS', completed: false },
];

const buildState = (overrides: Partial<TodoState> = {}) => ({
  todos: { todos: [], loading: false, error: null, ...overrides },
});

describe('todoSelectors', () => {
  describe('selectAllTodos', () => {
    it('deve retornar a lista completa de todos', () => {
      const state = buildState({ todos: mockTodos });
      expect(selectAllTodos(state)).toEqual(mockTodos);
    });

    it('deve retornar array vazio quando não há todos', () => {
      const state = buildState({ todos: [] });
      expect(selectAllTodos(state)).toEqual([]);
    });
  });

  describe('selectLoading', () => {
    it('deve retornar true quando loading está ativo', () => {
      const state = buildState({ loading: true });
      expect(selectLoading(state)).toBe(true);
    });

    it('deve retornar false quando loading está inativo', () => {
      const state = buildState({ loading: false });
      expect(selectLoading(state)).toBe(false);
    });
  });

  describe('selectError', () => {
    it('deve retornar a mensagem de erro', () => {
      const state = buildState({ error: 'Falha na requisição' });
      expect(selectError(state)).toBe('Falha na requisição');
    });

    it('deve retornar null quando não há erro', () => {
      const state = buildState({ error: null });
      expect(selectError(state)).toBeNull();
    });
  });
});
