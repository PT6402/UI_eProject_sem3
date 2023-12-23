import { UIBox, UIButton } from "../../../../../common";
import { Card, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import FormAddressStore from "./FormAddressStore";

export default function CreateAddressStore() {
  return (
    <UIBox mt={1} mb={20}>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Card sx={{ overflow: "visible" }}>
            <UIBox p={2}>
              <FormAddressStore />
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
                  <UIButton variant="gradient" color="dark">
                    Submit
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
