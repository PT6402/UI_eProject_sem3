/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { handleGetRowAddresUser } from "../../../admin/Address_store/data";
import {
  GetDistrict,
  GetProvices,
  GetWard,
} from "../../../../../../helpers/GetAddressApi";
import { UIBox, UISelect, UITypography } from "../../../../../common";
export default function AddressStore({ getAddressStore }) {
  const dataFormStep = useSelector((state) => state.dataFormStep);
  const [addressDefault, setAddressDefault] = useState(null);
  const [status, setStatus] = useState(null);
  const handleGetItemAddress = async () => {
    if (
      dataFormStep.value?.province_code &&
      dataFormStep.value?.district_code &&
      dataFormStep.value?.ward_code
    ) {
      await handleGetRowAddresUser({
        province_code: dataFormStep.value.province_code,
        district_code: dataFormStep.value.district_code,
        ward_code: dataFormStep.value.ward_code,
      }).then((data) =>
        setAddressDefault({
          province: { value: data.province_code, label: data.province_name },
          district: { value: data.district_code, label: data.district_name },
          ward: { value: data.ward_code, label: data.ward_name },
          phone_code: data.phone_code,
        })
      );
    }
  };
  useEffect(() => {
    setStatus(true);
    if (addressDefault != null) {
      setAddressSelected({
        provice: {
          value: {
            code: addressDefault.province.value,
            phone_code: addressDefault.phone_code,
          },
          label: addressDefault.province.label,
        },
        district: addressDefault.district,
        ward: addressDefault.ward,
      });
    }
  }, [addressDefault]);
  useEffect(() => {
    handleGetItemAddress();
  }, [dataFormStep.value]);

  const districtInput = useRef();
  const wardInput = useRef();
  const [addressInput, setAddressInpt] = useState(
    dataFormStep.value?.address || ""
  );
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
    getAddressStore({
      address: addressInput,
      province_code: addressSelected.provice?.value.code,
      district_code: addressSelected.district?.value,
      ward_code: addressSelected.ward?.value,
      phone_code: addressSelected.provice?.value.phone_code,
      p_d_w: addressSelected,
    });
  }, [addressSelected, addressInput, addressDefault]);

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
      {addressDefault && status ? (
        <UIBox>
          <UIBox width="80%" textAlign="center" mx="auto" mb={4}>
            <UIBox mb={1}>
              <UITypography variant="h5" fontWeight="regular">
                Address install?
              </UITypography>
            </UIBox>
          </UIBox>
          <UIBox mt={3} p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <UIBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                  <UITypography
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                    textTransform="capitalize"
                    sx={{ fontSize: "1.3rem" }}>
                    Provice
                  </UITypography>
                </UIBox>
                <UISelect
                  defaultValue={addressDefault?.province}
                  custom
                  size="large"
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
                    textTransform="capitalize"
                    sx={{ fontSize: "1.3rem" }}>
                    District
                  </UITypography>
                </UIBox>
                <UISelect
                  defaultValue={addressDefault?.district}
                  custom
                  size="large"
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
                    textTransform="capitalize"
                    sx={{ fontSize: "1.3rem" }}>
                    Ward
                  </UITypography>
                </UIBox>
                <UISelect
                  defaultValue={addressDefault?.ward}
                  custom
                  size="large"
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
                <label className={styles.label}>
                  <span>Address:</span>
                  <input
                    className={styles.input}
                    type="text"
                    required
                    value={addressInput}
                    onChange={(e) => setAddressInpt(e.target.value)}
                  />
                </label>
                {/* <FormField
                type="text"
                label="Address"
                value={addressInput}
                onChange={(e) => setAddressInpt(e.target.value)}
              /> */}
              </Grid>
            </Grid>
          </UIBox>
        </UIBox>
      ) : (
        <>
          {
            <UIBox>
              <UIBox width="80%" textAlign="center" mx="auto" mb={4}>
                <UIBox mb={1}>
                  <UITypography variant="h5" fontWeight="regular">
                    Address install?
                  </UITypography>
                </UIBox>
              </UIBox>
              <UIBox mt={3} p={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <UIBox
                      mb={1}
                      ml={0.5}
                      lineHeight={0}
                      display="inline-block">
                      <UITypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                        textTransform="capitalize"
                        sx={{ fontSize: "1.3rem" }}>
                        Provice
                      </UITypography>
                    </UIBox>
                    <UISelect
                      custom
                      size="large"
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
                    <UIBox
                      mb={1}
                      ml={0.5}
                      lineHeight={0}
                      display="inline-block">
                      <UITypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                        textTransform="capitalize"
                        sx={{ fontSize: "1.3rem" }}>
                        District
                      </UITypography>
                    </UIBox>
                    <UISelect
                      custom
                      size="large"
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
                    <UIBox
                      mb={1}
                      ml={0.5}
                      lineHeight={0}
                      display="inline-block">
                      <UITypography
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                        textTransform="capitalize"
                        sx={{ fontSize: "1.3rem" }}>
                        Ward
                      </UITypography>
                    </UIBox>
                    <UISelect
                      custom
                      size="large"
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
                    <label className={styles.label}>
                      <span>Address:</span>
                      <input
                        className={styles.input}
                        type="text"
                        required
                        value={addressInput}
                        onChange={(e) => setAddressInpt(e.target.value)}
                      />
                    </label>
                    {/* <FormField
                type="text"
                label="Address"
                value={addressInput}
                onChange={(e) => setAddressInpt(e.target.value)}
              /> */}
                  </Grid>
                </Grid>
              </UIBox>
            </UIBox>
          }
        </>
      )}
    </>
  );
}
