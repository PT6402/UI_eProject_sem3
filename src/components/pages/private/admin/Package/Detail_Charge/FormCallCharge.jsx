/* eslint-disable react/prop-types */
import { UIBox, UITypography } from "../../../../../common";
import { Grid } from "@mui/material";
import { useState } from "react";
import MDEditor from "../../../../../common/private/UIEditor";
export default function FormCallCharge({ duration }) {
  const [description, setDecription] = useState(duration?.description || "");
  console.log(description);
  const value = (value) => {
    setDecription(value);
  };
  return (
    <UIBox sx={() => ({ width: "100%" })}>
      <UITypography variant="h5">Detail Call Charge</UITypography>
      <UIBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={12}>
            <MDEditor
              value={value}
              input={description}
              edit
              readOnly={true}
              toolbarHidden={true}
            />
          </Grid>
        </Grid>
      </UIBox>
    </UIBox>
  );
}
