import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/AppConfig";
import { AuthActionType, authStore } from "../Redux/AuthState";
import dataLoadService from "./DataLoadService";

class AuthService {
  public async register(user: UserModel) {
    const response = await axios.post<string>(appConfig.registerUrl, user);
    const token = response.data;
    authStore.dispatch({ type: AuthActionType.Register, payload: token });
  }

  public async login(credentials: CredentialsModel) {
    const response = await axios.post<string>(appConfig.loginUrl, credentials);
    const token = response.data;
    authStore.dispatch({ type: AuthActionType.Login, payload: token });
  }
}

const authService = new AuthService();

export default authService;
