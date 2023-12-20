/* eslint-disable react/prop-types */
import { ThemeProvider } from "@emotion/react";
import { Grid } from "@mui/material";
import { UIBox } from "../components/common";
import { PrivateTheme } from "../assets/themes";

export default function FrameUI({ children }) {
  return (
    <ThemeProvider theme={PrivateTheme}>
      <Grid container item xs={12} sm={10} md={8} lg={7} sx={{ mx: "auto" }}>
        <UIBox>{children}</UIBox>
      </Grid>
    </ThemeProvider>
  );
}
