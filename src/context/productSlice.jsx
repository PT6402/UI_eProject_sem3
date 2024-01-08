import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    list: [],
  },
  reducers: {
    setValue: (state, actions) => {
      state.list = actions.payload;
    },
  },
});

export const { setValue } = productSlice.actions;
export default productSlice.reducer;
