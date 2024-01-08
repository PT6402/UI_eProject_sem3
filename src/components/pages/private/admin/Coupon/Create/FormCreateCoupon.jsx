/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { UIBox, UITypography } from "../../../../../common";
import { Grid } from "@mui/material";
import FormField from "../Detail/FormField";

export default function FormCreateCoupon({ handleGetData }) {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [percentDiscount, setPercentDiscount] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    handleGetData({
      to,
      from,
      percentDiscount,
      name,
    });
  }, [percentDiscount, from, to, name]);
  return (
    <UIBox>
      <UITypography variant="h5">Create Supplier</UITypography>
      <UIBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="to connect"
              value={to}
              placeholder={"enter to connect"}
              onChange={(e) => setTo(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="from connect"
              placeholder={"enter from connect"}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormField
              type="text"
              label="percent discount of deposit connect(%)"
              placeholder={"enter percent"}
              value={percentDiscount}
              onChange={(e) => setPercentDiscount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormField
              type="text"
              label="name coupon"
              placeholder={"enter name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
        </Grid>
      </UIBox>
    </UIBox>
  );
}
