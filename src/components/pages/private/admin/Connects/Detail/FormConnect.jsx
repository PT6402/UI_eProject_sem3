/* eslint-disable react/prop-types */
import { UIBox, UISelect, UITypography } from "../../../../../common";
import MDEditor from "../../../../../common/private/UIEditor";
import { Grid } from "@mui/material";
import FormField from "./FormField";
import { useEffect, useState } from "react";
export default function FormConnect({ data, handleGetData }) {
  const [name, setName] = useState(data?.name);
  const [deposit, setDeposit] = useState(data?.deposit);
  const [description, setDecription] = useState(data?.description || "");
  const [status, setStatus] = useState({
    value: data?.status || false,
    label: data?.status ? "Public" : "Hide" || "Hide",
  });
  const [firstLetter, setFirstLetter] = useState(data?.firstLetter || "");
  const value = (value) => {
    setDecription(value);
  };
  useEffect(() => {
    handleGetData({
      name,
      deposit,
      description,
      firstLetter,
      status: status.value,
    });
  }, [name, deposit, description, status, firstLetter]);
  return (
    <UIBox>
      <UITypography variant="h5">Create Connect</UITypography>
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
                  value: status.value,
                  label: status.label,
                }}
                onChange={(choice) => setStatus(choice)}
                options={[
                  { value: true, label: "Public" },
                  { value: false, label: "Hide" },
                ]}
              />
            </UIBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="firstLetter"
              value={firstLetter}
              onChange={(e) => setFirstLetter(e.target.value)}
            />
          </Grid>
        </Grid>
      </UIBox>
    </UIBox>
  );
}
