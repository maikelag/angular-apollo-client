import * as snackBarActions from './snack-bar.actions';

export interface State {
  show: boolean;
}

export const intialState: State = {
  show: false
};
export function snackBarReducer(
  state: State = intialState,
  action: snackBarActions.SnackBarActions
) {
  switch (action.type) {
    case snackBarActions.SnackBarActionTypes.SNACKBAR_OPEN: {
      return { ...state, show: true };
    }

    case snackBarActions.SnackBarActionTypes.SNACKBAR_CLOSE: {
      return { ...state, show: false };
    }

    default:
      return state;
  }
}
