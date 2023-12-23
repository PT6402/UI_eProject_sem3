/* eslint-disable react/prop-types */
import { UIBox, UISelect, UITypography } from "../../../../../common";
import MDEditor from "../../../../../common/private/UIEditor";
import { Grid } from "@mui/material";
import FormField from "./FormField";
import { useState } from "react";
export default function FormConnect({ data }) {
  const [name, setName] = useState(data.name);
  const [deposit, setDeposit] = useState(data.deposit);
  const [description, setDecription] = useState(data.description || "");
  console.log(description);
  const value = (value) => {
    setDecription(value);
  };

  return (
    <UIBox>
      <UITypography variant="h5">Update Connect</UITypography>
      <UIBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="deposit"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
            />
          </Grid>
        </Grid>
      </UIBox>
      <UIBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <UIBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <UITypography
                component="label"
                variant="caption"
                fontWeight="bold">
                Description&nbsp;&nbsp;
                <UITypography
                  variant="caption"
                  fontWeight="regular"
                  color="text">
                  (optional)
                </UITypography>
              </UITypography>
            </UIBox>
            <MDEditor value={value} input={description} edit />
          </Grid>
          <Grid item xs={12} sm={6}>
            <UIBox mb={3}>
              <UIBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <UITypography
                  component="label"
                  variant="caption"
                  fontWeight="bold"
                  textTransform="capitalize">
                  Status
                </UITypography>
              </UIBox>
              <UISelect
                defaultValue={{
                  value: data.status,
                  label: data.status ? "Public" : "Hide",
                }}
                options={[
                  { value: true, label: "Public" },
                  { value: false, label: "Hide" },
                ]}
              />
            </UIBox>
          </Grid>
        </Grid>
      </UIBox>
    </UIBox>
  );
}
