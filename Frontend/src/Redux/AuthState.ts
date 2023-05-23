import { configureStore } from "@reduxjs/toolkit";
import UserModel from "../Models/UserModel";
import jwtDecode from "jwt-decode";

//1. Auth State
class AuthState {
  public token: string = null;
  public user: UserModel = null;

  public constructor() {
    const rememberUser = localStorage.getItem("rememberUser");
    if (rememberUser) {
      this.token = localStorage.getItem("user");
    } else {
      this.token = sessionStorage.getItem("user");
    }

    if (this.token) {
      this.user = jwtDecode<{ user: UserModel }>(this.token).user;
    }
  }
}

//2. Auth Action Types
export enum AuthActionType {
  Register,
  Login,
  Logout,
}

//3. Auth Action Interface
export interface AuthAction {
  type: AuthActionType;
  payload: string;
}

//4. Redux Reducer
function authReducer(
  currentState = new AuthState(),
  action: AuthAction
): AuthState {
  const newState: AuthState = JSON.parse(JSON.stringify(currentState));

  switch (action.type) {
    case AuthActionType.Register:
    case AuthActionType.Login: //Here, the payload is a token
      newState.token = action.payload;
      newState.user = jwtDecode<{ user: UserModel }>(action.payload).user;
      const rememberUser = localStorage.getItem("rememberUser");
      if (rememberUser) {
        localStorage.setItem("user", newState.token);
      } else {
        sessionStorage.setItem("user", newState.token);
      }
      break;
    case AuthActionType.Logout: //Here we have no payload
      newState.token = null;
      newState.user = null;
      sessionStorage.removeItem("user");
      localStorage.removeItem("user");
      break;
  }

  return newState;
}

//5. Auth Store
export const authStore = configureStore({
  reducer: authReducer,
});
