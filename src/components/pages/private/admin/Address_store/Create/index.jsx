import { Loader, UIBox, UIButton } from "../../../../../common";
import { Card, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import FormCreateAddressStore from "./FormAddressStore";
import { useAddressStore } from "../../../../../../hooks/useAddressStore";
import { createActionCreatorInvariantMiddleware } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export default function CreateAddressStore() {
  const { create, isLoading } = useAddressStore();
  const navigate = useNavigate();
  let data;
  const handleGetData = ({
    phone_code,
    province_code,
    district_code,
    ward_code,
    address,
  }) => {
    data = {
      phone_code,
      province_code,
      district_code,
      ward_code,
      address,
    };
  };
  const showAlert = async () =>
    Swal.fire("Success!", "You create address store!", "success");
  const handleSubmit = async () => {
    const dataRes2 = {
      address_full: `${data?.address}`,
      phone_code: `${data.phone_code}`,
      province_code: `${data.province_code}`,
      district_code: `${data.district_code}`,
      ward_code: `${data.ward_code}`,
    };
    await create({ dataRes2 });
    navigate("/admin/address-stores");
    showAlert();
    // console.log(dataRes);
  };
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <UIBox mt={1} sx={() => ({ width: "100%" })}>
          <Grid container justifyItems={"flex-end"}>
            <Grid item xs={12}>
              <Card sx={() => ({ overflow: "visible", width: "100%" })}>
                <UIBox p={3}>
                  <FormCreateAddressStore handleGetData={handleGetData} />
                  <UIBox>
                    <UIBox
                      mt={3}
                      width="100%"
                      display="flex"
                      justifyContent="space-between">
                      <Link to={"/admin/address-stores"}>
                        <UIButton variant="gradient" color="secondary">
                          back
                        </UIButton>
                      </Link>
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
      )}
    </>
  );
}
