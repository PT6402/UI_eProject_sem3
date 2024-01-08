/* eslint-disable react/prop-types */
import { Card } from "@mui/material";
import { UIBox } from "../../../../../../../common";
import ItemConfirm from "./ItemConfirm";
import { useSelector } from "react-redux";

export default function Confirm({ setActiveStep }) {
  const value = useSelector((state) => state.dataFormStep.value);
  const handleEditStep = (idStep) => {
    setActiveStep(idStep);
  };
  return (
    <Card id="delete-account">
      <UIBox pb={2} px={2}>
        <UIBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <ItemConfirm
            id={0}
            name="infor employee"
            fullName={value?.fullName}
            email={value?.email}
            phone={value?.phone}
            handleEditStep={handleEditStep}
          />
          <ItemConfirm
            id={1}
            name="type employee"
            type={value?.employee_type?.name}
            handleEditStep={handleEditStep}
          />
          <ItemConfirm
            id={2}
            name="address store"
            region={value?.region_selected?.label}
            addressStore={value?.address_store?.label}
            handleEditStep={handleEditStep}
            noGutter
          />
        </UIBox>
      </UIBox>
    </Card>
  );
}
