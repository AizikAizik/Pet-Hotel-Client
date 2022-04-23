import { createStore, createTypedHooks } from "easy-peasy";
import { HotelsModel, HotelsSession } from "./models/hotel.model";
import { BookingModel, BookingSession } from "./models/booking.model";
import { petModel, PetSession } from "./models/pet.model";
import { Profile, profileModel } from "./models/profile.model";
import { UserModel, UserSession } from "./models/user.model";

export interface StoreModel {
  userSession: UserSession;
  profile: Profile;
  pet: PetSession;
  hotelsState: HotelsSession;
  booking: BookingSession;
}

const store = createStore<StoreModel>({
  userSession: UserModel,
  pet: petModel,
  hotelsState: HotelsModel,
  profile: profileModel,
  booking: BookingModel,
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default store;
