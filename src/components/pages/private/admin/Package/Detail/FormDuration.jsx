/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { UIBox, UITypography } from "../../../../../common";
import { Grid } from "@mui/material";
import FormField from "./FormField";
import { useEffect, useState } from "react";
import MDEditor from "../../../../../common/private/UIEditor";
export default function FormDuration({ duration, getData }) {
  const [time, setTime] = useState(duration?.time || "");
  const [price, setPrice] = useState(duration?.price || "");
  const [note, setNote] = useState(duration?.validate || "");
  const [description, setDecription] = useState(duration?.description || "");
  const value = (value) => {
    setDecription(value);
  };
  useEffect(() => {
    getData({ time, price, note, description });
  }, [time, price, note, description]);
  return (
    <UIBox>
      <UITypography variant="h5">
        {duration ? "Update" : "Create"} Duration
      </UITypography>
      <UIBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={12}>
            <FormField
              type="text"
              label="time:"
              placeholder="enter time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} sm={12}>
            <FormField
              type="text"
              label="price:"
              placeholder="enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} sm={12}>
            <FormField
              type="text"
              label="note:"
              placeholder="enter note or validate"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Grid>
          <Grid item xs={6} sm={12}>
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
        </Grid>
      </UIBox>
    </UIBox>
  );
}
