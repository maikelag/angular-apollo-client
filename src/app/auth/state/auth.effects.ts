import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Action, Store } from '@ngrx/store';
import { SecurityService } from '../services/security.service';
import { Observable, of, merge } from 'rxjs';
import { mergeMap, map, catchError, tap, switchMap } from 'rxjs/operators';
import {
  SetInitialUser,
  AuthActionTypes,
  SetCurrentUser,
  LoginUser,
  RegisterUser
} from './auth.actions';
import { User } from '../models/user.model';
import { RemoveError, AddError } from '../../state/error.actions';
import { ActionTypes } from '@app/state/counter.actions';

@Injectable()
export class AuthEffect {
  constructor(
    private action$: Actions,
    private authServices: SecurityService
  ) {}

  @Effect()
  setInitialUser$: Observable<Action> = this.action$.pipe(
    ofType<SetInitialUser>(AuthActionTypes.SET_INITIAL_USER),
    mergeMap((action: SetInitialUser) =>
      this.authServices.whoIAm().pipe(
        map((user: User) => new SetCurrentUser(user)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );

  @Effect()
  loginUser$: Observable<Action> = this.action$.pipe(
    ofType<LoginUser>(AuthActionTypes.LOGIN_USER),
    mergeMap((action: LoginUser) =>
      this.authServices.login(action.payload).pipe(
        map((user: User) => new SetCurrentUser(user)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );

  @Effect()
  registerUser$: Observable<Action> = this.action$.pipe(
    ofType<RegisterUser>(AuthActionTypes.REGISTER_USER),
    mergeMap((action: RegisterUser) =>
      this.authServices.register(action.payload).pipe(
        map((user: User) => new SetCurrentUser(user)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );

}
