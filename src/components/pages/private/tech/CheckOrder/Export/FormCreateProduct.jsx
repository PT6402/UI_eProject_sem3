/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { UIBox, UISelect, UITypography } from "../../../../../common";
import { Grid } from "@mui/material";
import FormField from "../../Product/Detail/FormField";

export default function FormExportProduct({ handleGetData, listProduct }) {
  const [productSelected, setProductSelected] = useState(null);
  useEffect(() => {
    if (productSelected?.value != null) {
      handleGetData({
        productId: productSelected.value,
      });
    }
  }, [productSelected]);
  return (
    <UIBox>
      <UITypography variant="h5">Export</UITypography>
      <UIBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <UIBox
              mb={1}
              ml={0.5}
              lineHeight={0}
              display="inline-block"
              sx={{ width: "100%" }}>
              <UITypography
                component="label"
                variant="caption"
                fontWeight="bold">
                Product
              </UITypography>
            </UIBox>
            <UISelect
              placeholder={"select product"}
              options={listProduct}
              onChange={(choice) => setProductSelected(choice)}
            />
          </Grid>
        </Grid>
      </UIBox>
    </UIBox>
  );
}
