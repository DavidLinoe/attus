import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Todo } from '../models/todo.models';

@Injectable({ providedIn: 'root' })
export class TodoApi{
  private mockTodos: Todo[] = [
    { id: 1, title: 'Estudar NgRx', completed: false },
    { id: 2, title: 'Implementar testes', completed: true },
    { id: 3, title: 'Revisar RxJS', completed: false },
  ];

  getAll(): Observable<Todo[]> {
    return of(this.mockTodos).pipe(delay(500));
  }
}
