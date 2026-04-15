import { Injectable } from '@angular/core';
import { NewUserForm, UsersFilter } from '../models/users.models';
import { ApiService } from '../../../services/apiService.service';

@Injectable()
export class UsersApi {
  constructor(private apiService: ApiService) {}

  getUsers(filters?: UsersFilter) {
    return this.apiService.get('users', filters?.name);
  }

  createUser(user: NewUserForm) {
    return this.apiService.post(user);
  }

  updateUser(user: NewUserForm) {
    return this.apiService.put(user);
  }

  deleteUser(id: number) {
    return this.apiService.delete(id);
  }
}
