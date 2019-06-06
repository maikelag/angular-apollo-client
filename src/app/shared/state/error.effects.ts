import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import * as errorActions from './error.actions';

@Injectable()
export class ErrorEffects {

    constructor(private actions$: Actions,
        private matSnackBar: MatSnackBar,
        private toastr: ToastrService) {
}

  @Effect({
    dispatch: false
  })
  remmoveError: Observable<Action> = this.actions$.pipe(
    ofType<errorActions.RemoveError>(
      errorActions.ErrorActionTypes.REMOVE_ERROR
    ),
    tap(() => this.matSnackBar.dismiss())
  );


  @Effect()
  addError: Observable<Action> = this.actions$.pipe(
    ofType<errorActions.AddError>(
      errorActions.ErrorActionTypes.ADD_ERROR
    ),
      map((action: errorActions.AddError) => action.payload),
      tap(payload => this.matSnackBar.open(payload.message, payload.type, payload.config)),
      // tap(payload => this.toastr.success(payload.message)),
      delay(5000),
      map(() => new errorActions.RemoveError())
    );

}