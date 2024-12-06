import { Component, inject } from '@angular/core';
import { IToDo } from '../data/to-do/to-do.interface';
import { ToDoStore } from '../signal-store/to-do.store';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'task-manager';

  readonly #toDoStore = inject(ToDoStore);

  todoList = this.#toDoStore.filteredToDos;
  isLoading = this.#toDoStore.isLoading;
  users = this.#toDoStore.users;
  currentUser = this.#toDoStore.currentUser;
  toDos = this.#toDoStore.filteredToDos;
  toDosError = this.#toDoStore.toDosError;
  usersError = this.#toDoStore.usersError;

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
}
