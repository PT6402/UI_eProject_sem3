import { createSlice } from "@reduxjs/toolkit";

const privateUISlice = createSlice({
  name: "privateUI",
  initialState: {
    miniSidenav: true,
    transparentSidenav: false,
    transparentNavbar: false,
    fixedNavbar: true,
    layout: "dashboard",
    sidenavColor: "info",
    buttonTable: { id: null, isOpen: false },
  },
  reducers: {
    setMiniSidenav: (state, action) => {
      state.miniSidenav = action.payload;
    },
    setTransparentSidenav: (state, action) => {
      state.transparentSidenav = action.payload;
    },
    setTransparentNavbar: (state, action) => {
      state.transparentNavbar = action.payload;
    },
    setFixedNavbar: (state, action) => {
      state.fixedNavbar = action.payload;
    },
    setLayout: (state, action) => {
      state.layout = action.payload;
    },
    setOpen: (state, action) => {
      state.buttonTable = action.payload;
    },
  },
});

export const {
  setFixedNavbar,
  setLayout,
  setMiniSidenav,
  setTransparentNavbar,
  setTransparentSidenav,
  setOpen,
} = privateUISlice.actions;
export default privateUISlice.reducer;
