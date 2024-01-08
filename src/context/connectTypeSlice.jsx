import { createSlice } from "@reduxjs/toolkit";

const connectTypeSlice = createSlice({
  name: "connectTypeSlice",
  initialState: {
    list: [],
  },
  reducers: {
    setValue: (state, actions) => {
      state.list = actions.payload;
    },
  },
});

export const { setValue } = connectTypeSlice.actions;
export default connectTypeSlice.reducer;
