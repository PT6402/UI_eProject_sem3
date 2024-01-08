import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState: {
    list: [],
  },
  reducers: {
    setValue: (state, actions) => {
      state.list = actions.payload;
    },
  },
});

export const { setValue } = employeeSlice.actions;
export default employeeSlice.reducer;
