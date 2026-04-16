import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { UsersApi } from './users.api';
import { ApiService } from '../../../services/apiService.service';
import { NewUserForm } from '../models/users.models';

describe('UsersApi', () => {
  let usersApi: UsersApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService, UsersApi],
    });
    usersApi = TestBed.inject(UsersApi);
  });

  it('deve criar a instância do serviço', () => {
    expect(usersApi).toBeTruthy();
  });

  describe('getUsers', () => {
    it('deve retornar todos os usuários quando sem filtro', () => {
      usersApi.getUsers().subscribe((users) => {
        expect(users.length).toBe(3);
      });
    });

    it('deve retornar usuários filtrados pelo nome', () => {
      usersApi.getUsers({ name: 'David' }).subscribe((users) => {
        expect(users.length).toBe(1);
        expect(users[0].name).toBe('David Lino');
      });
    });

    it('deve retornar lista vazia para nome inexistente', () => {
      usersApi.getUsers({ name: 'xyz_inexistente' }).subscribe((users) => {
        expect(users.length).toBe(0);
      });
    });

    it('deve ser case-insensitive na busca', () => {
      usersApi.getUsers({ name: 'david' }).subscribe((users) => {
        expect(users.length).toBe(1);
        expect(users[0].name).toBe('David Lino');
      });
    });
  });

  describe('createUser', () => {
    it('deve retornar o usuário criado', () => {
      const novoUsuario: NewUserForm = {
        name: 'Novo Usuário',
        email: 'novo@email.com',
        cpf: '000.000.000-00',
        phone: '(41) 99999-0000',
        phoneType: 'celular',
      };

      usersApi.createUser(novoUsuario).subscribe((res) => {
        expect(res).toEqual(novoUsuario);
        expect(res.name).toBe('Novo Usuário');
      });
    });
  });

  describe('updateUser', () => {
    it('deve retornar o usuário atualizado', () => {
      const usuarioAtualizado: NewUserForm = {
        id: 1,
        name: 'David Atualizado',
        email: 'david@email.com',
        cpf: '111.111.111-11',
        phone: '(41) 98888-0000',
        phoneType: 'celular',
      };

      usersApi.updateUser(usuarioAtualizado).subscribe((res) => {
        expect(res.id).toBe(1);
        expect(res.name).toBe('David Atualizado');
      });
    });
  });

  describe('deleteUser', () => {
    it('deve completar sem erros', () => {
      let completed = false;
      usersApi.deleteUser(1).subscribe({
        complete: () => {
          completed = true;
        },
      });
      expect(completed).toBe(true);
    });
  });
});
