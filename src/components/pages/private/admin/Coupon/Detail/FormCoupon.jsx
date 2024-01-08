/* eslint-disable react/prop-types */
import { UIBox, UITypography } from "../../../../../common";
import { Grid } from "@mui/material";
import FormField from "./FormField";
import { useEffect, useState } from "react";
export default function FormCoupon({ data, handleGetData }) {
  const [to, setTo] = useState(data?.to || "");
  const [from, setFrom] = useState(data?.from || "");
  const [percentDiscount, setPercentDiscount] = useState(
    data?.percent_discount || ""
  );
  const [name, setName] = useState(data?.name || "");

  useEffect(() => {
    handleGetData({
      to,
      from,
      percentDiscount,
      name,
    });
  }, [to, from, percentDiscount, name]);
  return (
    <UIBox>
      <UITypography variant="h5">Update Supplier</UITypography>
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
              label="percent discount of deposit connect (%)"
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
