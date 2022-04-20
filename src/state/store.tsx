import { createStore, createTypedHooks } from "easy-peasy";
import { Profile, profileModel } from "./models/profile.model";
import { UserModel, UserSession } from "./models/user.model";

interface StoreModel {
  userSession: UserSession;
  profile: Profile;
}

const store = createStore<StoreModel>({
  userSession: UserModel,
  profile: profileModel,
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default store;
