import { Actions, AuthActionTypes } from './auth.actions';
import { User } from '../models/user.model';
// import or declare state

export interface AuthState {
  user: User | null;
  loading: boolean;
  loaded: boolean;
}

export const intialState: AuthState = {
  user: null,
  loading: false,
  loaded: false
};

export function authReducer(state = intialState, action: Actions) {
  switch (action.type) {
    case AuthActionTypes.LOGIN_USER: {
      return { ...state, loading: true, loaded: false };
    }

    case AuthActionTypes.REGISTER_USER:
      return { ...state, loading: true, loaded: false };

    case AuthActionTypes.SET_CURRENT_USER:
      return { ...state, user: action.payload, loading: false, loaded: true };

    case AuthActionTypes.SET_INITIAL_USER:
      return { ...state, loading: true, loaded: false };

    default:
      return state;
  }
}
