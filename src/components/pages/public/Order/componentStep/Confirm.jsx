/* eslint-disable react/prop-types */
import { Card } from "@mui/material";
import { UIBox } from "../../../../common";
import ItemConfirm from "./ItemConfirm";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Confirm({ setActiveStep }) {
  const value = useSelector((state) => state.dataFormStep.value);
  const handleEditStep = (idStep) => {
    setActiveStep(idStep);
  };
  const [showAddressSort, setShow] = useState(false);
  useEffect(() => {
    if (value?.addressShort?.id != null) {
      setShow(true);
    }
  }, [value]);
  return (
    <Card id="delete-account">
      <UIBox pb={2} px={2}>
        <UIBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <ItemConfirm
            id={0}
            name="infor customer"
            fullName={value?.fullName}
            email={value?.email}
            phone={value?.phone}
            handleEditStep={handleEditStep}
          />
          <ItemConfirm
            id={1}
            name="infor address"
            address={value?.address}
            province={value?.p_d_w?.provice?.label}
            district={value?.p_d_w?.district?.label}
            ward={value?.p_d_w?.ward?.label}
            handleEditStep={handleEditStep}
          />
          <ItemConfirm
            id={2}
            name="infor service"
            typeConnect={value?.duration?.name_connect}
            package={value?.duration?.name_package}
            time={value?.duration?.duration?.time}
            price={value?.totalPrice}
            handleEditStep={handleEditStep}
            service
          />
          {showAddressSort && (
            <ItemConfirm
              id={1}
              name="infor address store handle"
              address={value?.addressShort?.address}
              province={value?.info_address_store?.province_name}
              district={value?.info_address_store?.district_name}
              ward={value?.info_address_store?.ward_name}
              handleEditStep={handleEditStep}
              noEdit
            />
          )}
        </UIBox>
      </UIBox>
    </Card>
  );
}
