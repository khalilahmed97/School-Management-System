import { createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';

export const initialState = {
    user: {},
    role:"",

};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => state),
  on(logout, (state) => state),
);