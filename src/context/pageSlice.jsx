import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "pageSlice",
  initialState: {
    status: false,
    page: null,
    value: null,
  },
  reducers: {
    setPage: (state, actions) => {
      state.page = actions.payload;
    },
    setStatusPage: (state, actions) => {
      state.status = actions.payload;
    },
    setValue: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { setPage, setStatusPage, setValue } = pageSlice.actions;
export default pageSlice.reducer;
