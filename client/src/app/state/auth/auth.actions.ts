import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth Component] Login', props<{username:string, password:string}>());
export const logout = createAction('[Auth Component] Logout');