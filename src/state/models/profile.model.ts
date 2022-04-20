import { action, Action, thunk, Thunk } from "easy-peasy";
import axios from "axios";
import { useStoreState } from "../store";

interface ProfileInfo {
  fullName: string;
  email: string;
  address?: {
    country: string;
    state: string;
    city: string;
    street?: string;
    zipCode?: number;
  };
}

export interface Profile {
  error: any | null;
  isLoading: boolean;
  userProfile: ProfileInfo | null;
  setError: Action<Profile, any>;
  setUserProfile: Action<Profile, ProfileInfo>;
  setIsLoading: Action<Profile, boolean>;
  getProfile: Thunk<Profile>;
}

export const profileModel: Profile = {
  isLoading: false,
  userProfile: null,
  error: null,

  // setters

  setUserProfile: action((state, payload) => {
    state.userProfile = payload;
  }),

  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  getProfile: thunk(async (actions, payload) => {
    try {
      const userSessionState = useStoreState((state) => state.userSession);
      const { token } = userSessionState;
      actions.setIsLoading(true);
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        "https://peaceful-garden-90498.herokuapp.com/api/users/profile",
        options
      );
      console.log(data);
      actions.setIsLoading(false);
      actions.setUserProfile(data);
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
};
