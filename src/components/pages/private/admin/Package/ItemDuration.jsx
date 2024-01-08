/* eslint-disable react/prop-types */
import { UIBox, UIButton } from "../../../../common";
import { Card } from "@mui/material";
import { DataTable } from "../../../../models";
import { useDispatch } from "react-redux";
import {
  setStatus,
  setType,
  setValue,
} from "../../../../../context/modalSlice";
import Form_Duration from "./Detail";

export default function ItemDuration({ dataDuration, package_id }) {
  const dispatch = useDispatch();
  const handleGetPackage_Id = () => {
    if (dataDuration.rows.length > 0) {
      return { package_id: dataDuration.rows[0].package_id };
    } else {
      return { package_id: package_id };
    }
  };
  const handleChangModal = () => {
    dispatch(setStatus(true));
    dispatch(setType(Form_Duration));
    dispatch(setValue(handleGetPackage_Id()));
  };
  return (
    <UIBox>
      <UIBox
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={1}
        mt={2}>
        <UIBox display="flex">
          <UIBox ml={1}>
            <UIButton color="info" size="small" onClick={handleChangModal}>
              + Duration
            </UIButton>
          </UIBox>
        </UIBox>
      </UIBox>
      {dataDuration.rows.length > 0 && (
        <Card>
          <DataTable
            table={dataDuration}
            entriesPerPage={false}
            showTotalEntries={false}
            isSorted={false}
            bgGrey
          />
        </Card>
      )}
    </UIBox>
  );
}
