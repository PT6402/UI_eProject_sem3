import { Loader, UIBox, UIButton } from "../../../../../common";
import { Card, Grid } from "@mui/material";
import FormConnect from "./FormSupplier";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSupplier } from "../../../../../../hooks/useSupplier";
import {
  setStatus,
  setStatusModal,
  setType,
  setValue,
} from "../../../../../../context/modalSlice";

export default function Detail_Supplier() {
  const dispatch = useDispatch();
  const [supplier, setSupplier] = useState(null);
  const { gets, isLoading, update } = useSupplier();
  const handleCallApi = async () => {
    await gets().then((res) => setSupplier(res));
  };

  useEffect(() => {
    handleCallApi();
  }, []);

  const handleGetById = (Id) => {
    if (supplier != null) {
      return supplier.find(({ id }) => id == Id);
    } else {
      return {};
    }
  };

  const modalType = useSelector((state) => state.modalType);
  let getData;
  const handleGetData = ({ phone, brandName, address }) => {
    getData = {
      id: modalType.value,
      phone,
      brandName,
      address,
    };
  };
  const handleSubmit = async () => {
    await update({ data: getData });
    dispatch(setStatusModal());
    dispatch(setStatus(false));
    dispatch(setType(null));
    dispatch(setValue(null));
  };
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && supplier != null && (
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
