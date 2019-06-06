import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import * as snackBarActions from './snack-bar.actions';

@Injectable()
export class SnackbarEffects {

    constructor(private actions$: Actions,
        private matSnackBar: MatSnackBar,
        private toastr: ToastrService) {
}

  @Effect({
    dispatch: false
  })
  closeSnackbar: Observable<Action> = this.actions$.pipe(
    ofType<snackBarActions.SnackbarClose>(
      snackBarActions.SnackBarActionTypes.SNACKBAR_CLOSE
    ),
    tap(() => this.matSnackBar.dismiss())
  );


  @Effect()
  showSnackbar: Observable<Action> = this.actions$.pipe(
    ofType<snackBarActions.SnackbarOpen>(
      snackBarActions.SnackBarActionTypes.SNACKBAR_OPEN
    ),
      map((action: snackBarActions.SnackbarOpen) => action.payload),
      tap(payload => this.matSnackBar.open(payload.message, payload.type, payload.config)),
      // tap(payload => this.toastr.success(payload.message)),
      delay(5000),
      map(() => new snackBarActions.SnackbarClose())
    );

}