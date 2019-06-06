import { Action } from '@ngrx/store';
import { MatSnackBarConfig } from '@angular/material';

export enum SnackBarActionTypes {
  SNACKBAR_OPEN = '[SNACKBAR] Show Snackbar',
  SNACKBAR_CLOSE = '[SNACKBAR] Hide Snackbar'
}

export class SnackbarOpen implements Action {
  readonly type = SnackBarActionTypes.SNACKBAR_OPEN;

  constructor(
    public payload: { message: string; type?: string; config?: MatSnackBarConfig }
  ) {}
}

export class SnackbarClose implements Action {
  readonly type = SnackBarActionTypes.SNACKBAR_CLOSE;
}

export type SnackBarActions = SnackbarOpen | SnackbarClose;
