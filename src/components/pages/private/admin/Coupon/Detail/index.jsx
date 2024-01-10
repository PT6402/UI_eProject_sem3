import { UIBox, UIButton } from "../../../../../common";
import { Card, Grid } from "@mui/material";
import FormConnect from "./FormCoupon";
import { useDispatch, useSelector } from "react-redux";
import { dataApiCoupon } from "../data";
import { useEffect, useState } from "react";
import { useCoupon } from "../../../../../../hooks/useCoupon";
import {
  setStatus,
  setStatusModal,
  setType,
  setValue,
} from "../../../../../../context/modalSlice";
import Swal from "sweetalert2";

export default function Detail_Coupon() {
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState(null);
  const { gets, isLoading, update } = useCoupon();
  const handleCallApi = async () => {
    await gets().then((res) => setCoupon(res));
  };

  useEffect(() => {
    handleCallApi();
  }, []);
  const modalType = useSelector((state) => state.modalType);
  const handleGetById = (Id) => {
    if (coupon != null) return coupon.find(({ id }) => id == Id);
  };
  let getData;
  const handleGetData = ({ to, from, percentDiscount, name }) => {
    getData = {
      id: modalType.value,
      to,
      from,
      percent_discount: percentDiscount,
      name,
    };
  };
  const showAlert = async () =>
    Swal.fire("Success!", "You update coupon!", "success");
  const handleSubmit = async () => {
    await update({ data: getData });
    dispatch(setStatusModal());
    dispatch(setStatus(false));
    dispatch(setType(null));
    dispatch(setValue(null));
    showAlert();
  };
  return (
    <>
      {!isLoading && coupon != null && (
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
