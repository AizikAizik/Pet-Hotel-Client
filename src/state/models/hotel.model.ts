import axios, { AxiosRequestConfig } from "axios";
import { action, Action, thunk, Thunk } from "easy-peasy";

interface HotelPackage {
  package: "Diamond" | "Gold" | "Silver" | string;
  price: number;
  description: string;
}

interface HotelComment {
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
  id: string;
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
  addComment: Thunk<
    HotelsSession,
    { id: string; comment: string; rating: number }
  >;
  fetchHotel: Thunk<HotelsSession, { id: string }>;
  fetchAll: Thunk<HotelsSession>;
}

export const HotelsModel: HotelsSession = {
  hotels: [],
  add: action((state, payload) => {
    state.hotels.push(payload);
  }),
  addComment: thunk((state, payload) => {}),
  fetchHotel: thunk(async (state, payload) => {
    try {
      let config: AxiosRequestConfig<any> = {
        method: "get",
        url: `https://peaceful-garden-90498.herokuapp.com/api/hotel/${payload.id}`,
        headers: {},
      };
      const { data } = await axios(config);
      console.log(data);
    } catch (error: any) {
      console.error(error);
    }
  }),
  fetchAll: thunk(async (state) => {
    try {
      let config: AxiosRequestConfig<any> = {
        method: "get",
        url: "https://peaceful-garden-90498.herokuapp.com/api/hotel/",
        headers: {},
      };
      const { data } = await axios(config);
      data.forEach((item: Hotel) => {
        state.add(item);
      });
    } catch (error: any) {
      console.error(error);
    }
  }),
};
