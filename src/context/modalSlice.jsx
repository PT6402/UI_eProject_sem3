import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal_type",
  initialState: {
    status: false,
    type: null,
    value: null,
    statusModal: false,
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setValue: (state, action) => {
      state.value = action.payload;
    },
    setStatusModal: (state) => {
      state.statusModal = !state.statusModal;
    },
  },
});

export const { setType, setStatus, setValue, setStatusModal } =
  modalSlice.actions;
export default modalSlice.reducer;
