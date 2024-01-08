import { UIBox, UIButton } from "../../../../../common";
import { Card, Grid } from "@mui/material";
import FormCreateConnect from "./FormCreateConnect";
import { axiosAuthentication } from "../../../../../../../http";
import { useDispatch } from "react-redux";
import {
  setStatus,
  setStatusModal,
  setType,
  setValue,
} from "../../../../../../context/modalSlice";
import { useConnect } from "../../../../../../hooks/useConnect";

export default function CreateConnect() {
  const dispatch = useDispatch();
  const { create } = useConnect();
  let getData;
  const handleGetData = ({
    name,
    firstLetter,
    deposit,
    status,
    description,
  }) => {
    getData = { name, firstLetter, deposit, status, description };
  };
  const handleSubmit = async () => {
    const data = {
      name: getData.name,
      firstLetter: getData.firstLetter,
      description: getData.description,
      deposit: getData.deposit,
    };
    await create({ data });
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
