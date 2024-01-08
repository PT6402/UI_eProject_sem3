import { createSlice } from "@reduxjs/toolkit";

const couponSlice = createSlice({
  name: "couponSlice",
  initialState: {
    list: [],
  },
  reducers: {
    setValue: (state, actions) => {
      state.list = actions.payload;
    },
  },
});

export const { setValue } = couponSlice.actions;
export default couponSlice.reducer;
