import { createSlice } from "@reduxjs/toolkit";

const supplierSlice = createSlice({
  name: "supplierSlice",
  initialState: {
    list: [],
  },
  reducers: {
    setValue: (state, actions) => {
      state.list = actions.payload;
    },
  },
});

export const { setValue } = supplierSlice.actions;
export default supplierSlice.reducer;
