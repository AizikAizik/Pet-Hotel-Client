import { action, Action, thunk, Thunk } from "easy-peasy";
import axios from "axios";

interface BookingInfo {
  _id: string;
  user: string;
  hotel: {
    _id: string;
    name: string;
    address: {
      country: string;
      state: string;
      latitude: number;
      longitude: number;
      city: string;
    };
  };
  pet: string;
  paymentMethod: "PayPal";
  bookingStaus: "InProgress" | "Completed";
  bookingDetails: {
    hotelPackage: "Diamond" | "Gold" | "Silver";
    bookingMethod: "PickUp" | "Home";
    checkInDate: string;
    checkOutDate: string;
    price_per_night: number;
    no_of_booking_days: number;
  };
  isPaid: boolean;
  deliveryCharge: number;
  totalPrice: number;
}

export interface BookingSession {
  error: any | null;
  isLoading: boolean;
  deleteMessage: any;
  bookingInfo: Array<BookingInfo> | [];
  setBookingInfo: Action<BookingSession, BookingInfo[]>;
  setIsLoading: Action<BookingSession, boolean>;
  setDeleteMessage: Action<BookingSession, any>;
  setError: Action<BookingSession, any>;
  addBooking: Thunk<
    BookingSession,
    {
      pet: string;
      hotel: string;
      hotelPackage: "Gold" | "Silver" | "Diamond";
      bookingMethod: "PickUp" | "Home";
      checkInDate: string;
      checkOutDate: string;
    }
  >;
  deleteBooking: Thunk<BookingSession, { bookingID: string }>;
  fetchBooking: Thunk<BookingSession>;
}

export const BookingModel: BookingSession = {
  isLoading: false,
  bookingInfo: [],
  error: null,
  deleteMessage: null,

  // setters
  setBookingInfo: action((state, payload) => {
    state.bookingInfo = payload;
  }),

  setDeleteMessage: action((state, payload) => {
    state.deleteMessage = payload;
  }),

  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  // action creators
  fetchBooking: thunk(async (actions, payload) => {
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
      const { data } = await axios.get(
        "https://peaceful-garden-90498.herokuapp.com/api/bookings",
        options
      );
      console.log(data);
      actions.setIsLoading(false);
      actions.setBookingInfo(data);
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

  addBooking: thunk(async (actions, payload) => {
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
      const { data } = await axios.post(
        "https://peaceful-garden-90498.herokuapp.com/api/bookings",
        payload,
        options
      );
      console.log(data);
      actions.setIsLoading(false);
      actions.setBookingInfo(data);
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

  deleteBooking: thunk(async (actions, payload) => {
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
        `https://peaceful-garden-90498.herokuapp.com/api/bookings/${payload.bookingID}`,
        options
      );
      console.log(data);
      actions.setIsLoading(false);
      actions.setDeleteMessage(data);
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
