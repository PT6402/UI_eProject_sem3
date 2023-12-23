/* eslint-disable react/prop-types */
import { ThemeProvider } from "@emotion/react";
import { PrivateTheme } from "../assets/themes";

export default function FrameUI({ children }) {
  return <ThemeProvider theme={PrivateTheme}>{children}</ThemeProvider>;
}
