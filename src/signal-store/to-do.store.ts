import {
  Injectable,
  computed,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { IToDo } from '../data/to-do/to-do.interface';
import { ToDoService } from '../data/to-do/to-do.service';
import { UsersService } from '../data/users/users.service';
import { IToDoState } from './to-do-state.interface';

@Injectable({
  providedIn: 'root',
})
export class ToDoStore {
  // Services
  readonly #userService = inject(UsersService);
  readonly #toDoService = inject(ToDoService);

  // Signal that holds the state (initial state)
  private state = signal<IToDoState>({
    isLoading: computed(() => {
      return (
        this.#toDoService.getToDoList.isLoading() ||
        this.#userService.getUsers.isLoading()
      );
    }),
    users: this.#userService.getUsers.value,
    currentUser: this.#userService.getUserDetails,
    usersToDos: this.#toDoService.getToDoList.value,
    incompleteOnly: false,
    toDosError: this.#toDoService.getToDoList.error,
    usersError: this.#userService.getUsers.error,
  });

  // Selectors (slices of state)
  users = this.state().users;
  isLoading = this.state().isLoading;
  toDosError = this.state().toDosError;
  usersError = this.state().usersError;
  currentUser = this.state().currentUser;

  #incompleteOnly = computed(() => this.state().incompleteOnly);

  filteredToDos = linkedSignal({
    source: () => this.state(),
    computation: () => {
      if (this.#incompleteOnly()) {
        return this.state()
          .usersToDos()
          ?.filter((t) => !t.completed);
      } else {
        return this.state().usersToDos();
      }
    },
  });

  filterToDos(checked: boolean) {
    this.state.update((state) => ({
      ...state,
      incompleteOnly: checked,
    }));
  }

  getToDosForMember(memberId: number | null) {
    this.#userService.userId.set(memberId);
  }

  changeStatus(task: IToDo, status: boolean) {
    this.state.update((state) => ({
      ...state,
      usersToDos: signal(
        this.state()
          .usersToDos()
          ?.map((t) => {
            return t.id === task.id ? { ...t, completed: status } : t;
          })
      ),
    }));
  }
}
