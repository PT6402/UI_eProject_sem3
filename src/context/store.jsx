import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import toastReducer from "./toastSlice";
import privateUISlice from "./privateUISlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer,
    privateUI: privateUISlice,
  },
});
export default store;
