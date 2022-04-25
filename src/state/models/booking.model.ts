import { action, Action, thunk, Thunk } from "easy-peasy";
import axios from "axios";

export interface BookingInfo {
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
  successMessage: any;
  bookingInfo: Array<BookingInfo> | [];
  setBookingInfo: Action<BookingSession, BookingInfo[]>;
  setIsLoading: Action<BookingSession, boolean>;
  setDeleteMessage: Action<BookingSession, any>;
  setSuccessMessage: Action<BookingSession, any>;
  addToBookingInfo: Action<BookingSession, BookingInfo>;
  setError: Action<BookingSession, any>;
  addBooking: Thunk<
    BookingSession,
    {
      pet: string;
      hotel: string;
      hotelPackage: "Gold" | "Silver" | "Diamond" | string;
      bookingMethod: "PickUp" | "Home" | string;
      checkInDate: string;
      checkOutDate: string;
    }
  >;
  makePayment: Thunk<
    BookingSession,
    {
      id: string;
      bookingId: string;
      emailAddress: string;
      status: any;
      update_time: any;
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
  successMessage: null,

  // setters
  setBookingInfo: action((state, payload) => {
    state.bookingInfo = payload;
  }),

  setDeleteMessage: action((state, payload) => {
    state.deleteMessage = payload;
  }),

  setSuccessMessage: action((state, payload) => {
    state.successMessage = payload;
  }),

  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

  addToBookingInfo: action((state, payload) => {
    //@ts-ignore
    state.petInfo.push(payload);
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
      actions.addToBookingInfo(data);
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

  makePayment: thunk(async (actions, payload) => {
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
      const { data } = await axios.put(
        `https://peaceful-garden-90498.herokuapp.com/api/bookings/${payload.bookingId}/pay`,
        payload,
        options
      );
      console.log(data);
      actions.setIsLoading(false);
      actions.setSuccessMessage("Successfully Paid!!");
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
