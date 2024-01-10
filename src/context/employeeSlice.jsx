import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState: {
    list: null,
    statusOrder: null,
  },
  reducers: {
    setValue: (state, actions) => {
      state.list = actions.payload;
    },
    setStatu: (state) => {
      state.statusOrder = !state.statusOrder;
    },
  },
});

export const { setValue, setStatu } = employeeSlice.actions;
export default employeeSlice.reducer;
