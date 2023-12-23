import { UIBox, UISelect, UITypography } from "../../../../../common";
import { Grid } from "@mui/material";
import FormField from "../../Connects/Detail/FormField";
import {
  GetProvices,
  GetDistrict,
  GetWard,
} from "../../../../../../helpers/GetAddressApi";
import { useEffect, useRef, useState } from "react";

export default function FormAddressStore() {
  const districtInput = useRef();
  const wardInput = useRef();

  const [addressSelected, setAddressSelected] = useState({
    provice: null,
    district: null,
    ward: null,
  });
  const [address, setAddress] = useState({
    provices: [],
    districts: [],
    wards: [],
  });

  useEffect(() => {
    GetProvices().then((res) =>
      setAddress((prev) => ({ ...prev, provices: res.data }))
    );
    if (addressSelected.provice != null) {
      GetDistrict(addressSelected.provice.value).then((res) =>
        setAddress((prev) => ({ ...prev, districts: res.data.districts }))
      );
    }
    if (addressSelected.district != null) {
      GetWard(addressSelected.district.value).then((res) =>
        setAddress((prev) => ({ ...prev, wards: res.data.wards }))
      );
    }
  }, [addressSelected]);

  const provicesSelect = [];
  if (address.provices != null) {
    address.provices.map((item) => {
      provicesSelect.push({ value: item.code, label: item.name });
    });
  }
  const districtsSelect = [];
  if (address.districts != null) {
    address.districts.map((item) => {
      districtsSelect.push({ value: item.code, label: item.name });
    });
  }
  const wardsSelect = [];
  if (address.wards != null) {
    address.wards.map((item) => {
      wardsSelect.push({ value: item.code, label: item.name });
    });
  }

  return (
    <UIBox>
      <UITypography variant="h5">Create Address store</UITypography>
      <UIBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <UIBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <UITypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize">
                Provice
              </UITypography>
            </UIBox>
            <UISelect
              placeholder={"Select Provice"}
              options={provicesSelect}
              onChange={(choice) => {
                districtInput.current.clearValue();
                wardInput.current.clearValue();
                return setAddressSelected({
                  provice: choice,
                  district: null,
                  ward: null,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <UIBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <UITypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize">
                District
              </UITypography>
            </UIBox>
            <UISelect
              placeholder={"Select District"}
              options={districtsSelect}
              onChange={(choice) => {
                wardInput.current.clearValue();
                setAddressSelected((prev) => ({
                  ...prev,
                  district: choice,
                  ward: null,
                }));
              }}
              ref={districtInput}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <UIBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <UITypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize">
                Ward
              </UITypography>
            </UIBox>
            <UISelect
              placeholder={"Select District"}
              options={wardsSelect}
              onChange={(choice) =>
                setAddressSelected((prev) => ({
                  ...prev,
                  ward: choice,
                }))
              }
              ref={wardInput}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormField type="text" label="Address" />
          </Grid>
        </Grid>
      </UIBox>
    </UIBox>
  );
}
