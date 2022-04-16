import { createStore, createTypedHooks } from "easy-peasy";
import { UserModel, UserSession } from "./models/user.model";

interface StoreModel {
  userSession: UserSession;
}

const store = createStore<StoreModel>({
  userSession: UserModel,
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default store;
