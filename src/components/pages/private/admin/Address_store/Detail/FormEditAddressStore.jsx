/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { Loader, UIBox, UISelect, UITypography } from "../../../../../common";
import FormField from "../../Connects/Detail/FormField";
import {
  GetDistrict,
  GetProvices,
  GetWard,
} from "../../../../../../helpers/GetAddressApi";
import { useEffect, useRef, useState } from "react";
import { handleGetRow } from "../data";
import { useSelector } from "react-redux";
import { useAddressStore } from "../../../../../../hooks/useAddressStore";

export default function FormEditAddressStore({ Id, handleGetData }) {
  const { gets, isLoading } = useAddressStore();

  const districtInput = useRef();
  const wardInput = useRef();

  const [addressStore, setAddressStore] = useState(null);
  const [addressDefault, setAddressDefault] = useState(null);
  const [addressInput, setAddressInput] = useState(addressDefault?.address);
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

  //handle call api
  useEffect(() => {
    gets().then((res) => setAddressStore(res));
  }, []);

  //handle get data for index
  useEffect(() => {
    if (addressDefault != null) {
      handleGetData({
        address: addressInput || addressDefault?.address,
        province_code:
          addressSelected.provice?.value.code || addressDefault?.province.value,
        district_code:
          addressSelected.district?.value || addressDefault?.district.value,
        ward_code: addressSelected.ward?.value || addressDefault?.ward.value,
        phone_code:
          addressSelected.provice?.value.phone_code ||
          addressDefault?.phone_code,
      });
    }
  }, [addressInput, addressSelected, addressDefault]);

  //handle call api province
  const handleGetItemAddress = async () => {
    if (addressStore != null) {
      const itemAddress = addressStore.find(({ id }) => id == Id);
      await handleGetRow(itemAddress).then((data) =>
        setAddressDefault({
          province: { value: data.province_code, label: data.province_name },
          district: { value: data.district_code, label: data.district_name },
          ward: { value: data.ward_code, label: data.ward_name },
          address: itemAddress.address_full,
          phone_code: itemAddress.phone_code,
          id: itemAddress.id,
        })
      );
    }
  };

  useEffect(() => {
    handleGetItemAddress();
  }, [addressStore]);

  useEffect(() => {
    GetProvices().then((res) =>
      setAddress((prev) => ({ ...prev, provices: res.data }))
    );
    if (addressSelected.provice != null) {
      GetDistrict(addressSelected.provice.value.code).then((res) =>
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
      provicesSelect.push({
        value: { code: item.code, phone_code: item.phone_code },
        label: item.name,
      });
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
    <>
      {isLoading && <Loader />}
      {!isLoading && addressStore != null && addressDefault != null && (
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
                  defaultValue={{
                    value: addressDefault?.province?.value,
                    label: addressDefault?.province?.label,
                  }}
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
                  defaultValue={{
                    value: addressDefault?.district?.value,
                    label: addressDefault?.district?.label,
                  }}
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
                  defaultValue={{
                    value: addressDefault?.ward?.value,
                    label: addressDefault?.ward?.label,
                  }}
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
                <FormField
                  type="text"
                  label="Address"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  defaultValue={addressDefault?.address}
                />
              </Grid>
            </Grid>
          </UIBox>
        </UIBox>
      )}
    </>
  );
}
