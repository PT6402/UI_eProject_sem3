import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    currentToast: {
      success: false,
      error: false,
      message: null,
    },
  },
  reducers: {
    Success: (state, action) => {
      state.currentToast = {
        success: true,
        error: false,
        message: action.payload,
      };
    },
    Error: (state, action) => {
      state.currentToast = {
        success: false,
        error: true,
        message: action.payload,
      };
    },
    Close: (state) => {
      state.currentToast = {
        success: false,
        error: false,
        message: null,
      };
    },
  },
});

export const { Success, Error, Close } = toastSlice.actions;
export default toastSlice.reducer;
