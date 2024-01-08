/* eslint-disable react/prop-types */
import { UIBox, UITypography } from "../../../../../common";
import { Grid } from "@mui/material";
import FormField from "./FormField";
import { useEffect, useState } from "react";
export default function FormSupplier({ data, handleGetData }) {
  const [brandName, setBrandName] = useState(data?.brand_name || "");
  const [phone, setPhone] = useState(data?.phone || "");
  const [address, setAddress] = useState(data?.address || "");

  useEffect(() => {
    handleGetData({
      phone,
      brandName,
      address,
    });
  }, [phone, brandName, address]);
  return (
    <UIBox>
      <UITypography variant="h5">Update Supplier</UITypography>
      <UIBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="brand name"
              value={brandName}
              placeholder={"enter brand name"}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="phone"
              placeholder={"enter phone supplier"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormField
              type="text"
              label="address"
              placeholder={"enter address"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
        </Grid>
      </UIBox>
    </UIBox>
  );
}
