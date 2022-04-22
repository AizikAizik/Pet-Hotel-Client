import { action, Action, thunk, Thunk } from "easy-peasy";
import axios from "axios";

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
  pets: {
    pet: "Dog" | "Cat";
    name: string;
    breed?: string;
    image?: string;
    likes?: string;
    dislike?: string;
    age?: number;
  }[];
}

export interface Profile {
  error: any | null;
  isLoading: boolean;
  userProfile: ProfileInfo;
  setError: Action<Profile, any>;
  setUserProfile: Action<Profile, ProfileInfo>;
  setIsLoading: Action<Profile, boolean>;
  getProfile: Thunk<Profile>;
  updateProfile: Thunk<
    Profile,
    {
      fullName?: string;
      email?: string;
      address: {
        country: string;
        state: string;
        city?: string;
        street?: string;
        zipCode?: string;
      };
    }
  >;
}

const userProfileFromStorage = localStorage.getItem("userProfile")
  ? JSON.parse(localStorage.getItem("userProfile")!)
  : null;

export const profileModel: Profile = {
  isLoading: false,
  userProfile: userProfileFromStorage,
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
      const token = JSON.parse(localStorage.getItem("token")!);
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
      actions.setIsLoading(false);
      localStorage.setItem("userProfile", JSON.stringify(data));
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

  updateProfile: thunk(async (actions, payload) => {
    try {
      const token = JSON.parse(localStorage.getItem("token")!);
      actions.setIsLoading(true);
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        "https://peaceful-garden-90498.herokuapp.com/api/users/profile",
        payload,
        options
      );
      actions.setIsLoading(false);
      localStorage.setItem("userProfile", JSON.stringify(data));
      actions.setUserProfile(data);
      //actions.getProfile();
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
