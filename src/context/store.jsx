import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import toastReducer from "./toastSlice";
import privateUISlice from "./privateUISlice";
import modalSlice from "./modalSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer,
    privateUI: privateUISlice,
    modalType: modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
