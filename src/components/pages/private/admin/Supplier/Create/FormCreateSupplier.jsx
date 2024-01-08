/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { UIBox, UITypography } from "../../../../../common";
import { Grid } from "@mui/material";
import FormField from "../Detail/FormField";

export default function FormCreateSupplier({ handleGetData }) {
  const [brandName, setBrandName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    handleGetData({
      brandName,
      phone,
      address,
    });
  }, [address, phone, brandName]);
  return (
    <UIBox>
      <UITypography variant="h5">Create Supplier</UITypography>
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
