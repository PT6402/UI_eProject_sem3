import { createSlice } from "@reduxjs/toolkit";

const packageSlice = createSlice({
  name: "packageSlice",
  initialState: {
    list: [],
    currentConnectType: null,
  },
  reducers: {
    setValue: (state, actions) => {
      state.list = actions.payload;
    },
    setCurrentConnect: (state, actions) => {
      state.currentConnectType = actions.payload;
    },
  },
});

export const { setValue, setCurrentConnect } = packageSlice.actions;
export default packageSlice.reducer;
