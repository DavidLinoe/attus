import { TestBed, ComponentFixture } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UsersListComponent } from './usersList.component';
import { UsersList } from '../../models/users.models';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const mockUsers: UsersList[] = [
  { id: 1, name: 'David Lino', email: 'david@email.com' },
  { id: 2, name: 'Giana Sandrini', email: 'giana@email.com' },
];

describe('UsersListComponent', () => {
  let fixture: ComponentFixture<UsersListComponent>;
  let component: UsersListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListComponent],
      providers: [provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('users', mockUsers);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar os usuários recebidos via input', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    const rows = compiled.querySelectorAll('.user-row');
    expect(rows.length).toBe(2);
  });

  it('deve exibir o nome de cada usuário', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    const names = compiled.querySelectorAll('.user-name');
    expect(names[0].textContent?.trim()).toBe('David Lino');
    expect(names[1].textContent?.trim()).toBe('Giana Sandrini');
  });

  it('deve exibir o email de cada usuário', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    const emails = compiled.querySelectorAll('.user-email');
    expect(emails[0].textContent?.trim()).toBe('david@email.com');
    expect(emails[1].textContent?.trim()).toBe('giana@email.com');
  });

  it('deve não renderizar linhas quando a lista estiver vazia', () => {
    fixture.componentRef.setInput('users', []);
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement;
    const rows = compiled.querySelectorAll('.user-row');
    expect(rows.length).toBe(0);
  });

  it('deve emitir openEditModal ao clicar no botão de edição', () => {
    const spy = vi.fn();
    component.openEditModal.subscribe(spy);

    const compiled: HTMLElement = fixture.nativeElement;
    const editButton = compiled.querySelector<HTMLButtonElement>('button[aria-label="Editar usuário"]');
    editButton?.click();

    expect(spy).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('deve emitir o usuário correto ao editar o segundo item', () => {
    const spy = vi.fn();
    component.openEditModal.subscribe(spy);

    const compiled: HTMLElement = fixture.nativeElement;
    const editButtons = compiled.querySelectorAll<HTMLButtonElement>('button[aria-label="Editar usuário"]');
    editButtons[1]?.click();

    expect(spy).toHaveBeenCalledWith(mockUsers[1]);
  });
});
