import { createSlice } from "@reduxjs/toolkit";
// [INIT_USER]
const initUser = {
  userId: null,
  fullName: null,
  email: null,
  phone: null,
  role: null,
  isVerified: false,
  accessToken: null,
  tp_contract_id: null,
  address_store_id: null,
  employee_id: null,
};
const userSlice = createSlice({
  name: "user",
  initialState: {
    info_user: {
      userId: null,
      fullName: null,
      email: null,
      phone: null,
      role: null,
      isVerified: false,
      accessToken: null,
      tp_contract_id: null,
      address_store_id: null,
      employee_id: null,
    },
  },
  reducers: {
    set_access_token_user: (state, action) => {
      state.info_user.accessToken = action.payload;
    },
    set_info_user: (state, action) => {
      state.info_user = action.payload;
    },
    remove_info_user: (state) => {
      state.info_user = initUser;
    },
  },
});
export const { set_info_user, remove_info_user, set_access_token_user } =
  userSlice.actions;
export default userSlice.reducer;
