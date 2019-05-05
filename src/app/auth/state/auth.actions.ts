import { Action } from '@ngrx/store';

import { User } from '../models/user.model';

export enum AuthActionTypes {
  LOGIN_USER = '[AUTH] Login user',
  REGISTER_USER = '[AUTH] Registert user',
  SET_CURRENT_USER = '[AUTH] Set current user',
  SET_INITIAL_USER = '[AUTH] Set initial user'
}

export class LoginUser implements Action {
  readonly type = AuthActionTypes.LOGIN_USER;
  constructor(public payload: User) {}
}

export class RegisterUser implements Action {
  readonly type = AuthActionTypes.REGISTER_USER;
  constructor(public payload: User) {}
}

export class SetCurrentUser implements Action {
  readonly type = AuthActionTypes.SET_CURRENT_USER;
  constructor(public payload: User) {}
}

export class SetInitialUser implements Action {
  readonly type = AuthActionTypes.SET_INITIAL_USER;
  constructor() {}
}

export type Action = LoginUser | RegisterUser | SetCurrentUser | SetInitialUser;
