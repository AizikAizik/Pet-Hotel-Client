import { action, Action, thunk, Thunk } from "easy-peasy";
import axios from "axios";

export interface UserInfo {
  id: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface UserSession {
  error: any | null;
  isLoggedIn: boolean;
  token: string | null;
  isLoading: boolean;
  userInfo: UserInfo | null;
  setToken: Action<UserSession, string>;
  setLoggedIn: Action<UserSession, boolean>;
  setUserInfo: Action<UserSession, UserInfo>;
  setIsLoading: Action<UserSession, boolean>;
  setError: Action<UserSession, any>;
  login: Thunk<UserSession, { password: string; email: string }>;
  logout: Action<UserSession, null>;
  register: Thunk<
    UserSession,
    { password: string; email: string; fullName: string }
  >;
}

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : null;

export const UserModel: UserSession = {
  isLoggedIn: false,
  isLoading: false,
  token: null,
  userInfo: userInfoFromStorage,
  error: null,

  // actions
  setToken: action((state, payload) => {
    state.token = payload;
  }),

  setLoggedIn: action((state, payload) => {
    state.isLoggedIn = payload;
  }),

  setUserInfo: action((state, payload) => {
    state.userInfo = payload;
  }),

  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  login: thunk(async (actions, payload) => {
    try {
      actions.setIsLoading(true);
      const { data } = await axios.post(
        "https://peaceful-garden-90498.herokuapp.com/api/users/login",
        payload
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("token", JSON.stringify(data.token));

      actions.setToken(data.token);
      actions.setLoggedIn(true);
      actions.setUserInfo(data);
      actions.setError(null);
      actions.setIsLoading(false);
    } catch (error: any) {
      actions.setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      actions.setIsLoading(false);
    }
  }),

  register: thunk(async (actions, payload) => {
    try {
      actions.setIsLoading(true);
      const { data } = await axios.post(
        "https://peaceful-garden-90498.herokuapp.com/api/users/register",
        payload
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("token", JSON.stringify(data.token));

      actions.setToken(data.token);
      actions.setLoggedIn(true);
      actions.setUserInfo(data);
      actions.setError(null);
      actions.setIsLoading(false);
    } catch (error: any) {
      actions.setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
      actions.setIsLoading(false);
    }
  }),

  logout: action((state, payload) => {
    state.isLoggedIn = false;
    state.token = null;
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userProfile");
    state.userInfo = null;
  }),
};
