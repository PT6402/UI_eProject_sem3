import { createSlice } from "@reduxjs/toolkit";

const dataAdmin = createSlice({
  name: "dataAdmin",
  initialState: {
    addressStore: null,
  },
  reducers: {
    setValue: (state, actions) => {
      state.addressStore = actions.payload;
    },
  },
});

export const { setValue } = dataAdmin.actions;
export default dataAdmin.reducer;
