/* eslint-disable react/prop-types */
import { useState } from "react";
import { UIBox, UIButton, UIInput, UITypography } from "../../../common";
import { Card, Grid } from "@mui/material";

export default function SearchInvoice({ handleSubmit }) {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");

  return (
    <UIBox sx={{ width: "100%" }}>
      <Grid
        container
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        spacing={2}>
        <Grid item xs={12} md={8} sx={{ width: "100%" }} lg={6}>
          <Card sx={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
            <UIBox
              p={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "2.5rem",
                width: "100%",
              }}>
              <UITypography
                component="p"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap" }}>
                To date:
              </UITypography>
              <UIInput
                type={"datetime-local"}
                size={"uipublic"}
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </UIBox>
            <UIBox
              p={2}
              textAlign="center"
              lineHeight={1.25}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}>
              <UITypography
                component="p"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap" }}>
                From date:
              </UITypography>
              <UIInput
                type={"datetime-local"}
                size={"uipublic"}
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </UIBox>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <UIButton
            color="black"
            sx={{
              fontSize: "1.5rem",
              fontFamily: " Monument Extended, sans-serif",
              padding: "1rem 2rem",
              borderRadius: "1rem",
              color: "#fff",
              transition: " all 0.1s ease-in",
              "&:active": {
                transform: " scale(0.9)",
              },
              "&:hover": {
                background: "#000",
                color: "#fff",
                borderColor: "#000",
              },
            }}
            onClick={() => handleSubmit({ to, from })}>
            Search
          </UIButton>
        </Grid>
      </Grid>
    </UIBox>
  );
}
