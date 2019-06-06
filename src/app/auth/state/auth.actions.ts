import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export enum AuthActionTypes {
  LOGIN_USER = '[AUTH] Login User',
  LOGIN_USER_SUCCESS = '[AUTH] Login User Success',
  REGISTER_USER = '[AUTH] Register User',
  REGISTER_USER_SUCCESS = '[AUTH] Register User Success',
  SET_CURRENT_USER = '[AUTH] Set current user',
  SET_INITIAL_USER = '[AUTH] Set initial user'
}

export class LoginUser implements Action {
  readonly type = AuthActionTypes.LOGIN_USER;
  constructor(public payload: {username: string, password: string}) {}
}

export class LoginUserSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_USER_SUCCESS;
  constructor(public payload: any) {}
}

export class RegisterUser implements Action {
  readonly type = AuthActionTypes.REGISTER_USER;
  constructor(public payload: { usenrname: string; password: string }) {}
}

export class RegisterUserSuccess implements Action {
  readonly type = AuthActionTypes.REGISTER_USER;
  constructor(public payload: { usenrname: string; password: string }) {}
}

export class SetCurrentUser implements Action {
  readonly type = AuthActionTypes.SET_CURRENT_USER;
  constructor(public payload: User) {}
}

export class SetInitialUser implements Action {
  readonly type = AuthActionTypes.SET_INITIAL_USER;
  constructor() {}
}

export type Actions =
  | LoginUser
  | LoginUserSuccess
  | RegisterUser
  | RegisterUserSuccess
  | SetCurrentUser
  | SetInitialUser;
