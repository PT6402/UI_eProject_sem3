import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal_type",
  initialState: {
    status: false,
    type: null,
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setType, setStatus } = modalSlice.actions;
export default modalSlice.reducer;
