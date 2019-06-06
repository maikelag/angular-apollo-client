import { Action } from '@ngrx/store';
import { User } from '@app/auth/models/user.model';

export enum AuthActionsTypes {
  LOGIN_USER = '[AUTH] Login user',
  REGISTER_USER = '[AUTH] Register user',
  SET_INITIAL_USER = '[AUTH] Set initial user',
  SET_CURRENT_USER = '[AUTH] Set current user'
}

export class LoginUser implements Action {
  readonly type = AuthActionsTypes.LOGIN_USER;
  constructor(public payload: Partial<User>) {}
}

export class RegisterUser implements Action {
  readonly type = AuthActionsTypes.REGISTER_USER;
  constructor(public payload: Partial<User>) {}
}

export class SetInitialUser implements Action {
  readonly type = AuthActionsTypes.SET_INITIAL_USER;
}

export class SetCurrentUser implements Action {
  readonly type = AuthActionsTypes.SET_CURRENT_USER;
  constructor(public payload: Partial<User> | null) {}
}

export type AuthActions =
  | LoginUser
  | RegisterUser
  | SetInitialUser
  | SetCurrentUser;
