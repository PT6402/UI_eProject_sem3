/* eslint-disable react/prop-types */
import { ThemeProvider } from "@emotion/react";
import { Grid } from "@mui/material";
import { UIBox } from "../components/common";
import { PrivateTheme } from "../assets/themes";

export default function FrameUI({ children }) {
  return <ThemeProvider theme={PrivateTheme}>{children}</ThemeProvider>;
}
