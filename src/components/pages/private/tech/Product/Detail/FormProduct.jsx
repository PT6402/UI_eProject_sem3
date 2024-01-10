/* eslint-disable react/prop-types */
import { UIBox, UITypography } from "../../../../../common";
import { Grid } from "@mui/material";
import FormField from "./FormField";
import { useEffect, useState } from "react";

export default function FormProduct({ data, handleGetData }) {
  const [quantityPlus, setQuantityPlus] = useState("");

  useEffect(() => {
    handleGetData({
      quantityPlus,
    });
  }, [quantityPlus]);

  return (
    <UIBox sx={{ width: "100%" }}>
      <UITypography variant="h5" sx={{ width: "100%" }}>
        Import
      </UITypography>
      <UIBox mt={3} sx={{ width: "100%" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="Product Name "
              value={data?.name}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="quantity current"
              value={data?.quantity}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormField
              type="text"
              label="quantity plus"
              placeholder={"enter number connect"}
              value={quantityPlus}
              onChange={(e) => setQuantityPlus(e.target.value)}
            />
          </Grid>
        </Grid>
      </UIBox>
    </UIBox>
  );
}
