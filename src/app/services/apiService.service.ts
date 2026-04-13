import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersList } from '../pages/users/models/users.models';

@Injectable()
export class ApiService {
  public get(url:string, params?: string): Observable<UsersList[]> {
    return new Observable<UsersList[]>((observer) => {
      const filtered = apiUsersResponse.filter((user) =>
        user.name
          .toLowerCase()
          .trim()
          .includes(params ? params.toLowerCase().trim() : ''),
      );
      observer.next(filtered);
      observer.complete();
    });
  }

  public post() {}

  public put() {}

  public patch() {}

  public delete() {}
}

const apiUsersResponse: UsersList[] = [
  { name: 'David Lino', email: 'davidelino290@gmail.com' },
  { name: 'Giana Sandrini', email: 'giana@attus.com' },
  { name: 'Jonh Doe ', email: 'jonh@gmail.com' },
];
