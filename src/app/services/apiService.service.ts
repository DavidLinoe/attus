import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersList } from '../pages/users/models/users.models';

@Injectable()
export class ApiService {
  public get(url: string, params?: string): Observable<UsersList[]> {
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

  public post<T>(body: T): Observable<T> {
    return new Observable<T>((observer) => {
      observer.next(body);
      observer.complete();
    });
  }

  public put<T extends { id?: number }>(body: T): Observable<T> {
    return new Observable<T>((observer) => {
      observer.next(body);
      observer.complete();
    });
  }

  public patch() {}

  public delete(id: number): Observable<void> {
    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }
}

const apiUsersResponse: UsersList[] = [
  { id: 1, name: 'David Lino', email: 'davidelino290@gmail.com' },
  { id: 2, name: 'Giana Sandrini', email: 'giana@attus.com' },
  { id: 3, name: 'Jonh Doe ', email: 'jonh@gmail.com' },
];
