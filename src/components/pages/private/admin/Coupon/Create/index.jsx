import { UIBox, UIButton } from "../../../../../common";
import { Card, Grid } from "@mui/material";
import FormCreateConnect from "./FormCreateCoupon";
import { useDispatch } from "react-redux";
import { useCoupon } from "../../../../../../hooks/useCoupon";
import {
  setStatus,
  setStatusModal,
  setType,
  setValue,
} from "../../../../../../context/modalSlice";
import Swal from "sweetalert2";

export default function CreateCoupon() {
  const dispatch = useDispatch();
  const { create } = useCoupon();
  let getData;
  const handleGetData = ({ to, from, percentDiscount, name }) => {
    getData = {
      to,
      from,
      percent_discount: percentDiscount,
      name,
    };
  };
  const showAlert = async () =>
    Swal.fire("Success!", "You create coupon!", "success");
  const handleSubmit = async () => {
    await create({ data: getData });
    dispatch(setStatusModal());
    dispatch(setStatus(false));
    dispatch(setType(null));
    dispatch(setValue(null));
    showAlert();
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
