import { createSlice } from "@reduxjs/toolkit";

const dataFormStep = createSlice({
  name: "data_form_step",
  initialState: {
    value: {},
  },
  reducers: {
    setValue: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { setValue } = dataFormStep.actions;
export default dataFormStep.reducer;
