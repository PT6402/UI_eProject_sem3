import { createSlice } from "@reduxjs/toolkit";

const addressStoreSlice = createSlice({
  name: "addressStoreSlice",
  initialState: {
    list: [],
  },
  reducers: {
    setValue: (state, actions) => {
      state.list = actions.payload;
    },
  },
});

export const { setValue } = addressStoreSlice.actions;
export default addressStoreSlice.reducer;
