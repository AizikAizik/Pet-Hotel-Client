import { action, Action, thunk, Thunk } from "easy-peasy";
import axios from "axios";

interface PetInfo {
  id: string;
  name: string;
  breed?: string;
  pet: "Dog" | "Cat";
  age: number;
  image: string;
  likes?: string;
  dislikes?: string;
}

export interface PetSession {
  error: any | null;
  isLoading: boolean;
  petInfo: PetInfo | null;
  setPetInfo: Action<PetSession, PetInfo>;
  setIsLoading: Action<PetSession, boolean>;
  setError: Action<PetSession, any>;
  AddPet: Thunk<
    PetSession,
    {
      pet: "Cat" | "Dog";
      name: string;
      image: string;
      age: number;
      breed?: string;
      likes?: string;
      dislikes?: string;
    }
  >;
  editPet: Thunk<
    PetSession,
    {
      pet: "Cat" | "Dog";
      name: string;
      image: string;
      age: number;
      breed?: string;
      likes?: string;
      dislikes?: string;
      petID: string;
    }
  >;
  deletePet: Thunk<PetSession, { petID: string }>;
  fetchPet: Thunk<PetSession>;
}

export const petModel: PetSession = {
  isLoading: false,
  petInfo: null,
  error: null,

  // actions
  setPetInfo: action((state, payload) => {
    state.petInfo = payload;
  }),

  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  AddPet: thunk(async (actions, payload) => {
    const token = JSON.parse(localStorage.getItem("token")!);
    // console.log(token);
    try {
      actions.setIsLoading(true);
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "https://peaceful-garden-90498.herokuapp.com/api/pets",
        payload,
        options
      );
      actions.setIsLoading(false);
      actions.setPetInfo(data);
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

  fetchPet: thunk(async (actions, payload) => {
    try {
      const token = JSON.parse(localStorage.getItem("token")!);
      //   console.log(token);
      actions.setIsLoading(true);
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        "https://peaceful-garden-90498.herokuapp.com/api/pets",
        options
      );
      actions.setIsLoading(false);
      actions.setPetInfo(data);
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

  editPet: thunk(async (actions, payload) => {
    const token = JSON.parse(localStorage.getItem("token")!);
    // console.log(token);
    try {
      actions.setIsLoading(true);
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `https://peaceful-garden-90498.herokuapp.com/api/pets/${payload.petID}`,
        payload,
        options
      );
      actions.setIsLoading(false);
      actions.setPetInfo(data);
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

  deletePet: thunk(async (actions, payload) => {
    const token = JSON.parse(localStorage.getItem("token")!);
    // console.log(token);
    try {
      actions.setIsLoading(true);
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `https://peaceful-garden-90498.herokuapp.com/api/pets/${payload}`,
        options
      );
      actions.setIsLoading(false);
      actions.setPetInfo(data);
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
