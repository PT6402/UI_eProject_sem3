/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  convertCodeToRegion,
  listPhoneCode,
} from "../../../../Address_store/data";
import { UIBox, UISelect, UITypography } from "../../../../../../../common";
import { Grid } from "@mui/material";

export default function AddressStore({ getAddressStore, getData, addresses }) {
  const dataFormStep = useSelector((state) => state.dataFormStep);
  const [regionSelected, setRegionSelected] = useState({
    value:
      dataFormStep.value?.region_selected?.value ||
      getData?.region_selected.value ||
      null,
    label:
      dataFormStep.value?.region_selected?.label ||
      getData?.region_selected.label ||
      null,
  });
  const [addressSelected, setAddressSelected] = useState({
    value:
      dataFormStep.value?.address_store?.value ||
      getData?.address_store.value ||
      null,
    label:
      dataFormStep.value?.address_store?.label ||
      getData?.address_store.label ||
      null,
  });
  const [listAddressStoreByRegion, setAddressStoreByRegion] = useState([]);
  const dataAddressStorePhoneCode = [];
  addresses.map((item) => {
    const { id } = convertCodeToRegion(item.phone_code);
    return dataAddressStorePhoneCode.push({ region_id: id });
  });
  const handleListRegion = () => {
    const listRegion = [];
    listPhoneCode.map((item) => {
      if (
        dataAddressStorePhoneCode.filter(
          ({ region_id }) => region_id == item.id
        ).length > 0
      ) {
        return listRegion.push({ label: item.name, value: item.id });
      }
    });
    return listRegion;
  };

  const handleGetAddressStore = () => {
    const listPhoneCodeByRegion = listPhoneCode
      .find(({ id }) => id == regionSelected.value)
      .code.split("-")
      .map((item) => item);
    const listAddress = addresses
      .filter(({ phone_code }) => listPhoneCodeByRegion.includes(phone_code))
      .map((item) => {
        return { label: item.address_full, value: item.id };
      });
    setAddressStoreByRegion(listAddress);
  };
  useEffect(() => {
    if (regionSelected.value != null) {
      handleGetAddressStore();
    }
  }, [regionSelected]);

  useEffect(() => {
    if (addressSelected != null) {
      getAddressStore({
        address_store: addressSelected,
        region_selected: regionSelected,
      });
    }
  }, [addressSelected]);

  return (
    <UIBox>
      <UIBox width="80%" textAlign="center" mx="auto" mb={4}>
        <UIBox mb={1}>
          <UITypography variant="h5" fontWeight="regular">
            Address store employee work ?
          </UITypography>
        </UIBox>
      </UIBox>
      <UIBox mt={2}>
        <Grid container spacing={3} justifyContent={"center"}>
          <Grid item xs={12} md={4}>
            <UIBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <UITypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize">
                Region
              </UITypography>
            </UIBox>
            <UISelect
              placeholder={"select region"}
              options={handleListRegion()}
              onChange={(choice) => {
                setAddressSelected({ value: null, label: null });
                return setRegionSelected(choice);
              }}
              defaultValue={
                dataFormStep.value?.region_selected || getData?.region_selected
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <UIBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <UITypography
                component="label"
                variant="caption"
                fontWeight="bold"
                textTransform="capitalize">
                Address store
              </UITypography>
            </UIBox>
            <UISelect
              defaultValue={dataFormStep.value?.address_store}
              placeholder={"select address store "}
              options={listAddressStoreByRegion}
              onChange={(choice) => setAddressSelected(choice)}
              value={addressSelected.value == null ? null : addressSelected}
            />
          </Grid>
        </Grid>
      </UIBox>
    </UIBox>
  );
}
