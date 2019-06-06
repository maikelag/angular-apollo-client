import * as authActions from './auth.actions';
import { User } from '@app/auth/models/user.model';

export interface AuthState {
  user: User | null | any;
  loading: boolean;
  loaded: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  loaded: false
};

export const authReducer: (state: AuthState, action: authActions.AuthActions) => AuthState = (
  state = initialState,
  action: authActions.AuthActions
) => {
  switch (action.type) {
    case authActions.AuthActionsTypes.LOGIN_USER:
      return { ...state, loading: true, loaded: false };
    case authActions.AuthActionsTypes.REGISTER_USER:
      return { ...state, loading: true, loaded: false };
    case authActions.AuthActionsTypes.SET_INITIAL_USER:
      return { ...state, loading: true, loaded: false };
    case authActions.AuthActionsTypes.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        loaded: true
      };
    default:
      return state;
  }
};
