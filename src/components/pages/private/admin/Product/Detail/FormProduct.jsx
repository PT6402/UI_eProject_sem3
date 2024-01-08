/* eslint-disable react/prop-types */
import { UIBox, UISelect, UITypography } from "../../../../../common";
import { Grid } from "@mui/material";
import FormField from "./FormField";
import { useEffect, useState } from "react";

export default function FormProduct({
  data,
  handleGetData,
  listSupplier,
  listConnect,
}) {
  const [name, setName] = useState(data?.name || "");
  const [numbConnect, setNumbConnect] = useState(data?.numb_connect || "");
  const [connectType, setConnectType] = useState(data?.connect_type || null);
  const [supplier, setSupplier] = useState(data?.supplier || null);

  useEffect(() => {
    handleGetData({
      name,
      numbConnect,
      connectType,
      supplier,
    });
  }, [name, numbConnect, connectType, supplier]);

  return (
    <UIBox>
      <UITypography variant="h5">Update Product</UITypography>
      <UIBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="name"
              value={name}
              placeholder={"enter name product"}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type="text"
              label="number connect"
              placeholder={"enter number connect"}
              value={numbConnect}
              onChange={(e) => setNumbConnect(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <UISelect
              defaultValue={connectType}
              placeholder={"enter connect"}
              options={listConnect}
              onChange={(choice) => setConnectType(choice)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <UISelect
              defaultValue={supplier}
              placeholder={"enter supplier"}
              options={listSupplier}
              onChange={(choice) => setSupplier(choice)}
            />
          </Grid>
        </Grid>
      </UIBox>
    </UIBox>
  );
}
