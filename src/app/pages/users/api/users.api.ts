import { Injectable } from '@angular/core';
import { UsersFilter } from '../models/users.models';
import { ApiService } from '../../../services/apiService.service';

@Injectable()
export class UsersApi {
  constructor(private apiService: ApiService) {}

  getUsers(filters?: UsersFilter) {
    return this.apiService.get('users', filters?.name);
  }
}
