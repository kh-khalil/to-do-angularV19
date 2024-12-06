import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { UsersService } from '../users/users.service';
import { IToDo } from './to-do.interface';

@Injectable({ providedIn: 'root' })
export class ToDoService {
  #http = inject(HttpClient);
  #userService = inject(UsersService);

  readonly getToDoList = rxResource<IToDo[], number | null>({
    request: this.#userService.userId,
    loader: ({ request: id }) => {
      return this.#http.get<IToDo[]>(
        `https://jsonplaceholder.typicode.com/todos${id ? '?userId=' + id : ''}`
      );
    },
  });
}
