import { TestBed, ComponentFixture } from '@angular/core/testing';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { UsersComponent } from './users.component';
import { UsersApi } from '../api/users.api';
import { ApiService } from '../../../services/apiService.service';
import { NavbarStore } from '../../../layout/navbar/store/navbar.store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Subject, of } from 'rxjs';
import { UsersList, NewUserForm } from '../models/users.models';

const mockUsers: UsersList[] = [
  { id: 1, name: 'David Lino', email: 'david@email.com' },
  { id: 2, name: 'Giana Sandrini', email: 'giana@email.com' },
];

describe('UsersComponent', () => {
  let fixture: ComponentFixture<UsersComponent>;
  let component: UsersComponent;
  let usersApiMock: Partial<UsersApi>;
  let navbarStore: NavbarStore;
  let dialog: MatDialog;

  beforeEach(async () => {
    usersApiMock = {
      getUsers: vi.fn().mockReturnValue(of(mockUsers)),
      createUser: vi.fn(),
      updateUser: vi.fn(),
      deleteUser: vi.fn(),
    };

    // O componente declara providers: [ApiService, UsersApi] no decorador.
    // Para substituir com mocks, usamos overrideComponent.
    await TestBed.configureTestingModule({
      imports: [UsersComponent],
      providers: [provideAnimations(), navbarStore],
    })
      .overrideComponent(UsersComponent, {
        set: {
          providers: [
            { provide: UsersApi, useValue: usersApiMock },
            { provide: ApiService, useValue: {} },
          ],
        },
      })
      .compileComponents();

    // Ativa fake timers depois do setup async para controlar o debounceTime(300)
    vi.useFakeTimers();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    navbarStore = TestBed.inject(NavbarStore);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário com os campos corretos', () => {
    const form = component.newUsersForm;
    expect(form.contains('name')).toBe(true);
    expect(form.contains('email')).toBe(true);
    expect(form.contains('phone')).toBe(true);
    expect(form.contains('cpf')).toBe(true);
    expect(form.contains('phoneType')).toBe(true);
  });

  it('deve chamar getUsers ao navbarStore emitir novo valor de busca', () => {
    navbarStore.search.next('David');
    vi.advanceTimersByTime(300);

    expect(usersApiMock.getUsers).toHaveBeenCalledWith({ name: 'David' });
  });

  it('deve atualizar a lista de usuários com o resultado de getUsers', () => {
    const usuariosFiltrados: UsersList[] = [{ id: 1, name: 'David Lino', email: 'david@email.com' }];
    vi.mocked(usersApiMock.getUsers!).mockReturnValue(of(usuariosFiltrados));

    navbarStore.search.next('David');
    vi.advanceTimersByTime(300);

    component.users$.subscribe((users) => {
      expect(users).toEqual(usuariosFiltrados);
    });
  });

  describe('openUserModal', () => {
    it('deve abrir o dialog ao chamar openUserModal', () => {
      const openSpy = vi.spyOn(dialog, 'open').mockReturnValue({
        componentInstance: { onSubmit: new Subject() },
        close: vi.fn(),
      } as unknown as MatDialogRef<unknown>);

      component.openUserModal();

      expect(openSpy).toHaveBeenCalled();
    });

    it('deve preencher o formulário ao abrir modal de edição', () => {
      vi.spyOn(dialog, 'open').mockReturnValue({
        componentInstance: { onSubmit: new Subject() },
        close: vi.fn(),
      } as unknown as MatDialogRef<unknown>);

      const usuario: UsersList = { id: 1, name: 'David', email: 'david@email.com' };
      component.openUserModal(usuario);

      expect(component.newUsersForm.value.name).toBe('David');
      expect(component.newUsersForm.value.email).toBe('david@email.com');
    });

    it('deve chamar createUser ao submeter novo usuário', () => {
      const novoUsuario: NewUserForm = {
        name: 'Novo',
        email: 'novo@email.com',
        cpf: '000.000.000-00',
        phone: '99999-9999',
        phoneType: 'celular',
      };

      const onSubmit = new Subject<NewUserForm>();
      vi.spyOn(dialog, 'open').mockReturnValue({
        componentInstance: { onSubmit: onSubmit.asObservable() },
        close: vi.fn(),
      } as unknown as MatDialogRef<unknown>);
      vi.mocked(usersApiMock.createUser!).mockReturnValue(of({ id: 99, ...novoUsuario }));

      component.openUserModal();
      onSubmit.next(novoUsuario);

      expect(usersApiMock.createUser).toHaveBeenCalledWith(novoUsuario);
    });

    it('deve adicionar o novo usuário à lista após criação', () => {
      const novoUsuario: NewUserForm = {
        name: 'Novo',
        email: 'novo@email.com',
        cpf: '000.000.000-00',
        phone: '99999-9999',
        phoneType: 'celular',
      };

      const onSubmit = new Subject<NewUserForm>();
      vi.spyOn(dialog, 'open').mockReturnValue({
        componentInstance: { onSubmit: onSubmit.asObservable() },
        close: vi.fn(),
      } as unknown as MatDialogRef<unknown>);
      vi.mocked(usersApiMock.createUser!).mockReturnValue(of({ id: 99, ...novoUsuario }));

      component.openUserModal();
      onSubmit.next(novoUsuario);

      component.users$.subscribe((users) => {
        expect(users.some((u) => u.name === 'Novo')).toBe(true);
      });
    });

    it('deve chamar updateUser ao submeter edição de usuário existente', () => {
      const usuarioExistente: UsersList = { id: 1, name: 'David', email: 'david@email.com' };
      const dadosAtualizados: NewUserForm = {
        id: 1,
        name: 'David Atualizado',
        email: 'david@email.com',
        cpf: '111.111.111-11',
        phone: '99999-9999',
        phoneType: 'celular',
      };

      const onSubmit = new Subject<NewUserForm>();
      vi.spyOn(dialog, 'open').mockReturnValue({
        componentInstance: { onSubmit: onSubmit.asObservable() },
        close: vi.fn(),
      } as unknown as MatDialogRef<unknown>);
      vi.mocked(usersApiMock.updateUser!).mockReturnValue(of(dadosAtualizados));

      component.openUserModal(usuarioExistente);
      onSubmit.next(dadosAtualizados);

      expect(usersApiMock.updateUser).toHaveBeenCalledWith(dadosAtualizados);
    });
  });
});
