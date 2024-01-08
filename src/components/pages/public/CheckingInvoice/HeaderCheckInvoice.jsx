import { UIBox, UITypography } from "../../../common";
import { Grid } from "@mui/material";

export default function HeaderCheckInvoice() {
  return (
    <UIBox p={2}>
      <Grid container flexDirection={"row"} justifyContent={"center"}>
        <Grid item xs={12} md={6} lg={6}>
          <UIBox
            height="100%"
            mt={0.5}
            lineHeight={1}
            sx={{
              margin: "0 1rem",
              display: "flex",
              justifyContent: "center",
            }}>
            <UITypography
              variant="h5"
              fontWeight="bold"
              sx={{
                padding: " 0 1rem",
                fontSize: "2.2rem",
                color: "#ee0033",
                whiteSpace: "nowrap",
                fontFamily: "Monument Extended, sans-serif",
              }}>
              Checking Invoice
            </UITypography>
          </UIBox>
        </Grid>
      </Grid>
    </UIBox>
  );
}
