import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';

import { SecurityService } from '../../../auth/services/security.service';
import * as fromAuth from './auth.actions';
import { SnackbarOpen } from '../snack-bar.actions';
import { User } from '@app/auth/models/user.model';

@Injectable()
export class AuthEffects {
  constructor(private action$: Actions, private authService: SecurityService) {}

  @Effect()
  setInitialUser$: Observable<Action> = this.action$.pipe(
    ofType<fromAuth.SetInitialUser>(fromAuth.AuthActionsTypes.SET_INITIAL_USER),
    mergeMap((action: fromAuth.SetInitialUser) =>
      this.authService.whoIAm().pipe(
        map((user: User) => new fromAuth.SetCurrentUser(user)),
        catchError(err =>
          of(
            new SnackbarOpen({
              message: 'Ha ocurrido un error',
              type: '',
              config: {
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration: 2000,
                panelClass: ['snackbar-error']
              }
            })
          )
        )
      )
    )
  );

  @Effect()
  loginUser$: Observable<Action> = this.action$.pipe(
    ofType<fromAuth.LoginUser>(fromAuth.AuthActionsTypes.LOGIN_USER),
    mergeMap((action: fromAuth.LoginUser) =>
      this.authService.login(action.payload).pipe(
        map((user: User) => new fromAuth.SetCurrentUser(user)),
        catchError(err =>
          of(
            new SnackbarOpen({
              message: 'Ha ocurrido un error',
              type: '',
              config: {
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration: 2000,
                panelClass: ['snackbar-error']
              }
            })
          )
        )
      )
    )
  );

  @Effect()
  registerUser$: Observable<Action> = this.action$.pipe(
    ofType<fromAuth.RegisterUser>(fromAuth.AuthActionsTypes.REGISTER_USER),
    mergeMap((action: fromAuth.RegisterUser) =>
      this.authService.register(action.payload).pipe(
        map((user: User) => new fromAuth.SetCurrentUser(user)),
        catchError(err =>
          of(
            new SnackbarOpen({
              message: 'Ha ocurrido un error',
              type: '',
              config: {
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration: 2000,
                panelClass: ['snackbar-error']
              }
            })
          )
        )
      )
    )
  );
}
