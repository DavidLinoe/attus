import { TestBed, ComponentFixture } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TodoComponent } from './todo.component';
import { TodoFacade } from '../facades/todo.facade';
import { BehaviorSubject, of } from 'rxjs';
import { Todo } from '../models/todo.models';

const mockTodos: Todo[] = [
  { id: 1, title: 'Estudar NgRx', completed: false },
  { id: 2, title: 'Implementar testes', completed: true },
];

describe('TodoComponent', () => {
  let fixture: ComponentFixture<TodoComponent>;
  let component: TodoComponent;
  let facadeMock: Partial<TodoFacade>;

  beforeEach(async () => {
    facadeMock = {
      todos$: of(mockTodos),
      loading$: of(false),
      error$: of(null),
      getAll: vi.fn(),
      toggle: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TodoComponent],
    })
      .overrideComponent(TodoComponent, {
        set: { providers: [{ provide: TodoFacade, useValue: facadeMock }] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar getAll ao inicializar', () => {
    expect(facadeMock.getAll).toHaveBeenCalledTimes(1);
  });

  it('deve delegar toggle ao facade com o id correto', () => {
    component.toggle(1);
    expect(facadeMock.toggle).toHaveBeenCalledWith(1);
  });

  it('deve exibir os itens da lista no template', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    expect(compiled.textContent).toContain('Estudar NgRx');
    expect(compiled.textContent).toContain('Implementar testes');
  });

  it('deve exibir loading quando loading$ emite true', async () => {
    (facadeMock as any).loading$ = of(true);

    await TestBed.resetTestingModule();
    await TestBed.configureTestingModule({ imports: [TodoComponent] })
      .overrideComponent(TodoComponent, {
        set: { providers: [{ provide: TodoFacade, useValue: facadeMock }] },
      })
      .compileComponents();

    const f = TestBed.createComponent(TodoComponent);
    f.detectChanges();

    const spinner = f.nativeElement.querySelector('mat-spinner');
    expect(spinner).not.toBeNull();
  });
});
