import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs/internal/observable/of';
import { IUser } from './user.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  #http = inject(HttpClient);
  #usersUrl = 'https://jsonplaceholder.typicode.com/users';

  userId = signal<number | null>(null);

  readonly getUsers = rxResource<IUser[], number | null>({
    loader: () => this.#http.get<IUser[]>(this.#usersUrl),
  });

  readonly getUserDetails = computed<IUser | undefined>(
    () => this.#getUsersDetails?.value()?.at(0) || undefined
  );

  readonly #getUsersDetails = rxResource<IUser[], number | null>({
    request: this.userId,
    loader: ({ request: id }) =>
      id === null
        ? of([])
        : this.#http.get<IUser[]>(`${this.#usersUrl}?id=${id}`),
  });
}
