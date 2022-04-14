import axios from "axios";
import { Action, action, createStore, Thunk, thunk } from "easy-peasy";
interface UserSession {
  isLoggedIn: boolean;
  token: string | null;
  setToken: Action<UserSession, string>;
  setLoggedIn: Action<UserSession, boolean>;
  login: Thunk<UserSession, {}>;
  logout: Action<UserSession, null>;
}
interface StoreModel {
  userSession: UserSession;
}

const store = createStore<StoreModel>({
  userSession: {
    isLoggedIn: false,
    token: null,
    setToken: action((state, payload) => {
      state.token = payload;
    }),
    setLoggedIn: action((state, payload) => {
      state.isLoggedIn = payload;
    }),

    login: thunk(async (actions, payload) => {
      const { data } = await axios.post(
        "https://peaceful-garden-90498.herokuapp.com/api/users/login",
        payload
      );
      console.log(data);
    }),

    logout: action((state, payload) => {
      state.isLoggedIn = false;
      state.token = null;
    }),
  },
});

export default store;
