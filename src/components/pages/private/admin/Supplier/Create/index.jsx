import { UIBox, UIButton } from "../../../../../common";
import { Card, Grid } from "@mui/material";
import FormCreateConnect from "./FormCreateSupplier";
import { useSupplier } from "../../../../../../hooks/useSupplier";
import { useDispatch } from "react-redux";
import {
  setStatus,
  setStatusModal,
  setType,
} from "../../../../../../context/modalSlice";
import { setValue } from "../../../../../../context/dataAdmin";

export default function CreateSupplier() {
  const dispatch = useDispatch();
  const { create } = useSupplier();
  let getData;
  const handleGetData = ({ brandName, phone, address }) => {
    getData = { brandName, phone, address };
  };
  const handleSubmit = async () => {
    await create({ data: getData });
    dispatch(setStatusModal());
    dispatch(setStatus(false));
    dispatch(setType(null));
    dispatch(setValue(null));
  };
  return (
    <UIBox mt={1}>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Card sx={{ overflow: "visible" }}>
            <UIBox p={2}>
              <UIBox>
                <FormCreateConnect handleGetData={handleGetData} />
                <UIBox
                  mt={3}
                  width="100%"
                  display="flex"
                  justifyContent="flex-end">
                  <UIButton
                    variant="gradient"
                    color="dark"
                    onClick={handleSubmit}>
                    Create
                  </UIButton>
                </UIBox>
              </UIBox>
            </UIBox>
          </Card>
        </Grid>
      </Grid>
    </UIBox>
  );
}
