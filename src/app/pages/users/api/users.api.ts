import { Injectable } from '@angular/core';
import { UsersFilter, UsersList } from '../models/users.models';

@Injectable()
export class UsersApi {
  constructor() {}
  // aqui importaria o http

  getUsers(filters?: UsersFilter) {
    return apiUsersResponse.filter((user) => user.name.includes(filters ? filters?.name : ''));
  }
}

const apiUsersResponse: UsersList[] = [
  { name: 'David Lino', email: 'davidelino290@gmail.com' },
  { name: 'Giana Sandrini', email: 'giana@attus.com' },
  { name: 'Jonh Doe ', email: 'jonh@gmail.com' },
];
