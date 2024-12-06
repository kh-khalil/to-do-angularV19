import { Signal } from '@angular/core';
import { IToDo } from '../data/to-do/to-do.interface';
import { IUser } from '../data/users/user.interface';

export interface IToDoState {
  isLoading: Signal<boolean>;
  currentUser: Signal<IUser | undefined>;
  users: Signal<IUser[] | undefined>;
  usersToDos: Signal<IToDo[] | undefined>;
  incompleteOnly: boolean;
  toDosError: Signal<unknown>;
  usersError: Signal<unknown>;
}
