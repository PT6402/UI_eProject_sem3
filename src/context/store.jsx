import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import toastReducer from "./toastSlice";
import privateUISlice from "./privateUISlice";
import modalSlice from "./modalSlice";
import dataFormStep from "./dataFormStep";
import dataAdmin from "./dataAdmin";
import addressStoreSlice from "./addressStoreSlice";
import employeeSlice from "./employeeSlice";
import connectTypeSlice from "./connectTypeSlice";
import packageSlice from "./packageSlice";
import couponSlice from "./couponSlice";
import supplierSlice from "./supplierSlice";
import productSlice from "./productSlice";
import userStore from "./user";
import pageSlice from "./pageSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    toast: toastReducer,
    privateUI: privateUISlice,
    modalType: modalSlice,
    dataFormStep: dataFormStep,
    dataAdmin: dataAdmin,
    //[ADMIN]

    //user
    employeeSlice: employeeSlice,
    userStore: userStore,

    //address-store
    addressStoreSlice: addressStoreSlice,

    //services
    connectTypeSlice: connectTypeSlice,
    packageSlice: packageSlice,

    //storage
    supplierSlice: supplierSlice,
    productSlice: productSlice,

    //coupon
    couponSlice: couponSlice,

    pageSlice: pageSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;
