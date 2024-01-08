import React from "react";
import { UIBox } from "../../../../common";
import { Card, Divider, Grid } from "@mui/material";
import Header from "./components/Header";
import OrdersOverview from "./components/TrackOrder";
import UserInformation from "./components/UserInformation";
import OrderSummary from "./components/OrderSummary";

export default function OrderDetail() {
  return (
    <>
      <UIBox p={2} sx={{ width: "100%" }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={12}>
            <Card sx={{ padding: "2rem" }}>
              <UIBox pt={2} px={2}>
                <Header />
              </UIBox>
              <Divider />
              <UIBox pt={1} pb={3} px={2}>
                {/* <UIBox mb={3}>
                  <OrderInfo />
                </UIBox>
                <Divider /> */}
                <UIBox mt={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={3}>
                      <OrdersOverview />
                    </Grid>
                    <Grid item xs={12} md={6} lg={5}>
                      <UIBox mt={3}>
                        <UserInformation />
                      </UIBox>
                      {/* <PaymentDetails /> */}
                    </Grid>
                    <Grid item xs={12} lg={3} sx={{ ml: "auto" }}>
                      <OrderSummary />
                    </Grid>
                  </Grid>
                </UIBox>
              </UIBox>
            </Card>
          </Grid>
        </Grid>
      </UIBox>
    </>
  );
}
