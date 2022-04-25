import axios, { AxiosRequestConfig } from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy";

interface HotelPackage {
  package: "Diamond" | "Gold" | "Silver" | string;
  price: number;
  description: string;
}

export interface HotelComment {
  comment: string;
  rating: number;
  user?: {
    id: string;
    fullName: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Hotel {
  _id: string;
  name: string;
  description: string;
  images: string[];
  roomsAvailable: number;
  address: {
    country: string;
    state: string;
    latitude: number;
    longitude: number;
    city: string;
  };
  comments?: HotelComment[];
  hotelPackages: HotelPackage[];
  num_of_reviews?: number;
  ratings?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface HotelsSession {
  hotels: Hotel[];
  add: Action<HotelsSession, Hotel>;
  addAll: Action<HotelsSession, Hotel[]>;
  addComment: Thunk<
    HotelsSession,
    { id: string; comment: string; rating: number }
  >;
  fetchAll: Thunk<HotelsSession>;
}

export const HotelsModel: HotelsSession = {
  hotels: [],
  add: action((state, payload) => {
    state.hotels.push(payload);
  }),
  addAll: action((state, payload) => {
    state.hotels = payload;
  }),
  addComment: thunk((state, payload) => {}),
  fetchAll: thunk(async (state) => {
    try {
      let config: AxiosRequestConfig<any> = {
        method: "get",
        url: "https://peaceful-garden-90498.herokuapp.com/api/hotel/",
        headers: {},
      };
      const { data } = await axios(config);
      state.addAll(data);
    } catch (error: any) {
      console.error(error);
    }
  }),
};
