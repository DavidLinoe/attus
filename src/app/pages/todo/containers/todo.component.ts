import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodoFacade } from '../facades/todo.facade';
import { Todo } from '../models/todo.models';

@Component({
  templateUrl: './todo.component.html',
  imports: [AsyncPipe, MatCheckboxModule, MatProgressSpinnerModule],
  providers: [TodoFacade],
})
export class TodoComponent {
  constructor(public todoFacade: TodoFacade) {
    this.todoFacade.getAll();
    this.todoFacade.todos$.subscribe((list: Todo[]) => {
      console.log(list);
    });
  }

  toggle(id: number) {
    this.todoFacade.toggle(id);
  }
}
