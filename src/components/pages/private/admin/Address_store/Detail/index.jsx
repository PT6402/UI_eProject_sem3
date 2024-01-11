import { Link, useNavigate, useParams } from "react-router-dom";
import { UIBox, UIButton } from "../../../../../common";
import { Card, Grid } from "@mui/material";
import FormEditAddressStore from "./FormEditAddressStore";
import { useAddressStore } from "../../../../../../hooks/useAddressStore";
import Swal from "sweetalert2";

export default function DetailAddressStore() {
  const { update, isLoading } = useAddressStore();
  const navigate = useNavigate();
  const { id: id } = useParams();
  let data;
  const handleGetData = ({
    phone_code,
    province_code,
    district_code,
    ward_code,
    address,
  }) => {
    data = {
      phone_code: `${phone_code}`,
      province_code: `${province_code}`,
      district_code: `${district_code}`,
      ward_code: `${ward_code}`,
      address_full: address,
      id: id,
    };
  };
  const showAlert = async () =>
    Swal.fire("Success!", "You update address store!", "success");
  const handleSubmit = async () => {
    await update({ data });
    navigate("/admin/address-stores");
    showAlert();
  };
  return (
    <>
      {
        <UIBox mt={1} sx={() => ({ width: "100%" })}>
          <Grid container justifyContent={"center"} alignItems={"center"}>
            <Grid item xs={12} lg={12}>
              <Card sx={{ overflow: "visible" }}>
                <UIBox p={2}>
                  <FormEditAddressStore Id={id} handleGetData={handleGetData} />
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
                        Update
                      </UIButton>
                    </UIBox>
                  </UIBox>
                </UIBox>
              </Card>
            </Grid>
          </Grid>
        </UIBox>
      }
    </>
  );
}
