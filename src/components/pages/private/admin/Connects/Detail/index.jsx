import { UIBox, UIButton } from "../../../../../common";
import { Card, Grid } from "@mui/material";
import FormConnect from "./FormConnect";
import { useDispatch, useSelector } from "react-redux";
import { useConnect } from "../../../../../../hooks/useConnect";
import { useEffect, useState } from "react";
import {
  setStatus,
  setStatusModal,
  setType,
  setValue,
} from "../../../../../../context/modalSlice";
import Swal from "sweetalert2";

export default function Detail_Connect() {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modalType);
  const [connect, setConnect] = useState(null);
  const { gets, isLoading, update } = useConnect();
  const handleCallApi = async () => {
    await gets().then((res) => setConnect(res));
  };

  useEffect(() => {
    handleCallApi();
  }, [modalType.statusModal]);
  const handleGetById = (Id) => {
    if (connect != null) {
      return connect.find(({ id }) => id == Id);
    }
  };
  let getData;
  const handleGetData = ({
    name,
    firstLetter,
    deposit,
    status,
    description,
  }) => {
    getData = {
      id: modalType.value,
      name,
      firstLetter,
      deposit,
      status,
      description,
    };
  };
  const showAlert = async () =>
    Swal.fire("Success!", "You update connect!", "success");
  const handleSubmit = async () => {
    await update({ data: getData });
    dispatch(setStatusModal());
    dispatch(setStatus(false));
    dispatch(setType(null));
    dispatch(setValue(null));
    await showAlert();
  };
  return (
    <>
      {!isLoading && connect != null && (
        <UIBox mt={1}>
          <Grid container>
            <Grid item xs={12} lg={12}>
              <Card sx={{ overflow: "visible" }}>
                <UIBox p={2}>
                  <UIBox>
                    <FormConnect
                      data={handleGetById(modalType.value)}
                      handleGetData={handleGetData}
                    />
                    <UIBox
                      mt={3}
                      width="100%"
                      display="flex"
                      justifyContent="flex-end">
                      <UIButton
                        variant="gradient"
                        color="dark"
                        onClick={handleSubmit}>
                        Update
                      </UIButton>
                    </UIBox>
                  </UIBox>
                </UIBox>
              </Card>
            </Grid>
          </Grid>
        </UIBox>
      )}
    </>
  );
}
