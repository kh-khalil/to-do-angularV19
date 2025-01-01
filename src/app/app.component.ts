import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { filter, of } from 'rxjs';
import { IToDo } from '../data/to-do/to-do.interface';
import { ToDoStore } from '../signal-store/to-do.store';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [HttpClient],
})
export class AppComponent implements OnInit {
  title = 'task-manager';

  readonly #toDoStore = inject(ToDoStore);

  todoList = this.#toDoStore.filteredToDos;
  isLoading = this.#toDoStore.isLoading;
  users = this.#toDoStore.users;
  currentUser = this.#toDoStore.currentUser;
  toDos = this.#toDoStore.filteredToDos;
  toDosError = this.#toDoStore.toDosError;
  usersError = this.#toDoStore.usersError;
  http = inject(HttpClient);
  onFilter(ele: EventTarget | null) {
    this.#toDoStore.filterToDos((ele as HTMLInputElement).checked);
  }

  onUserChange(ele: EventTarget | null) {
    this.#toDoStore.getToDosForMember(
      Number((ele as HTMLSelectElement)?.value)
    );
  }

  onChangeStatus(task: IToDo, ele: EventTarget | null) {
    this.#toDoStore.changeStatus(task, (ele as HTMLInputElement).checked);
  }

  //#region if the http request returns EMPTY or VOID, success & complete will not be called.
  test(isPew: boolean) {
    return isPew
      ? of([1, 2, 3, 4, 5])
      : this.http
          .get('https://jsonplaceholder.typicode.com/todos/1')
          // this pipe is to mimic the return of void or EMPTY
          .pipe(filter((value: any) => value.completed === true));
  }

  log(value: any) {
    console.log('a7eeh');
    console.log('pewpew', value);
  }

  ngOnInit(): void {
    // if the http request returns EMPTY, success & complete will not be called.
    this.test(false).subscribe({
      next: (value) => {
        this.log(value);
      },
      error: (error) => console.error(error),
      complete: () => console.log('complete'),
    });
  }
  //#endregion
}
