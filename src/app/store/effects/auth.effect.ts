import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { SecurityService } from '../../auth/services/security.service';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import {
  SetInitialUser,
  AuthActionTypes,
  SetCurrentUser,
  LoginUser,
  RegisterUser
} from '../actions/auth.action';
import { User } from '../../auth/models/user.model';
import { AddError, RemoveError } from '../actions/errors.action';
import { AppState } from '../app-store.module';

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authService: SecurityService,
    private store: Store<AppState>
  ) {}

  @Effect()
  setInitialUser$: Observable<Action> = this.action$.pipe(
    ofType<SetInitialUser>(AuthActionTypes.SET_INITIAL_USER),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap((action: SetInitialUser) =>
      this.authService.whoIAm().pipe(
        map((user: User) => new SetCurrentUser(user)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );

  @Effect()
  loginUser$: Observable<Action> = this.action$.pipe(
    ofType<LoginUser>(AuthActionTypes.LOGIN_USER),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap((action: LoginUser) =>
      this.authService.login(action.payload).pipe(
        map((user: User) => new SetCurrentUser(user)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );

  @Effect()
  registerUser$: Observable<Action> = this.action$.pipe(
    ofType<RegisterUser>(AuthActionTypes.REGISTER_USER),
    tap(() => this.store.dispatch(new RemoveError())),
    mergeMap((action: RegisterUser) =>
      this.authService.register(action.payload).pipe(
        map((user: User) => new SetCurrentUser(user)),
        catchError(err => of(new AddError(err.error)))
      )
    )
  );
}
