import { createSlice } from "@reduxjs/toolkit";

const userStore = createSlice({
  name: "userStore",
  initialState: {
    list: [],
  },
  reducers: {
    setValue: (state, actions) => {
      state.list = actions.payload;
    },
  },
});

export const { setValue } = userStore.actions;
export default userStore.reducer;
