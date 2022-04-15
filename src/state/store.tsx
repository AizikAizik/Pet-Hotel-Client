import axios from "axios";
import {
  Action,
  action,
  createStore,
  createTypedHooks,
  Thunk,
  thunk,
} from "easy-peasy";

interface UserInfo {
  id: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
}

interface UserSession {
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
  login: Thunk<
    UserSession,
    { password: string; email: string; fullName?: string }
  >;
  logout: Action<UserSession, null>;
}
interface StoreModel {
  userSession: UserSession;
}

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : null;

const store = createStore<StoreModel>({
  userSession: {
    // state variables
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
        actions.setIsLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(data));
        actions.setLoggedIn(true);
        actions.setUserInfo(data);
        actions.setToken(data.token);
        actions.setError(null);
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
    }),
  },
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default store;
