/* eslint-disable react/prop-types */
import { UIBox, UIButton, UITypography } from "../../../common";
import { Card, Grid } from "@mui/material";
import ItemService from "./ItemService";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { axiosAuthentication } from "../../../../../http";
export default function ItemContract({
  contract_id,
  fullname,
  phone,
  email,
  serviceDtos,
}) {
  const [orderIdSelect, setOrderIdSelect] = useState();
  const [selectService, setSelectService] = useState(null);
  const handleGetIdService = (id, orderId) => {
    setSelectService(id);
    setOrderIdSelect(orderId);
  };
  async function initializeStripe(pubKey) {
    const stripe = await loadStripe(pubKey);
    return stripe;
  }
  async function checkout({ pubKey, sessionId }) {
    const stripe = await initializeStripe(pubKey);
    stripe.redirectToCheckout({ sessionId });
  }
  const handlePayment = async () => {
    localStorage.setItem("back_page", "/online-payment");
    const url = `http://localhost:8000/api/Stripe/${orderIdSelect}`;
    await axiosAuthentication.get(url).then(async (res) => {
      if (res.status == 200) {
        const sessionId = res.data.sessionId;
        const pubKey =
          "pk_test_51OVfTBDuw2SA7iQX2LFfEOYc6Mz6OSDsMd9llazwmTzEPt9KdQc0QFotbVqPi6P9qKiGmnNDQXbmqAPkXSOZD8VW00upFCUZ4K";
        await checkout({ pubKey, sessionId }).then((res) => console.log(res));
        return;
      }
    });
  };
  return (
    <Card
      sx={{
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",

        overflow: "visible",
        // minWidth: "50rem",
      }}>
      <UIBox
        component="div"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        borderRadius="lg"
        p={3}
        sx={{ width: "100%", height: "100%" }}>
        <UIBox
          width="100%"
          display="flex"
          flexDirection="column"
          height={"100%"}>
          <UIBox mb={1} lineHeight={0}>
            <UITypography
              variant="caption"
              color="text"
              sx={{ fontSize: "1.4rem" }}
              fontWeight={"bold"}>
              Contract ID:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                textTransform="capitalize"
                sx={{ fontSize: "1.4rem" }}
                fontWeight={"bold"}>
                {contract_id}
              </UITypography>
            </UITypography>
          </UIBox>
          <UIBox mb={1} lineHeight={0}>
            <UITypography
              variant="caption"
              color="text"
              sx={{ fontSize: "1.4rem" }}>
              Fullname:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                sx={{ fontSize: "1.4rem" }}>
                {fullname}
              </UITypography>
            </UITypography>
          </UIBox>
          <UIBox mb={1} lineHeight={0}>
            <UITypography
              variant="caption"
              color="text"
              sx={{ fontSize: "1.4rem" }}>
              Phone:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                sx={{ fontSize: "1.4rem" }}>
                {phone}
              </UITypography>
            </UITypography>
          </UIBox>
          {email && (
            <UITypography
              variant="caption"
              color="text"
              sx={{ fontSize: "1.4rem" }}>
              Email:&nbsp;&nbsp;&nbsp;
              <UITypography
                variant="caption"
                fontWeight="medium"
                sx={{ fontSize: "1.4rem" }}>
                {email}
              </UITypography>
            </UITypography>
          )}

          <UIBox mt={3}>
            <UITypography sx={{ fontSize: "1.4rem" }} fontWeight={"bold"}>
              Select Serivce:
            </UITypography>
            <Grid container spacing={2}>
              {serviceDtos != null &&
                serviceDtos.map((item, index) => {
                  return (
                    <Grid item key={index} xs={12}>
                      <ItemService
                        name_service={item.connect_type}
                        packages={item.package}
                        duration={item.duration}
                        price={item.price}
                        id={index}
                        selectService={selectService}
                        handleGetIdService={handleGetIdService}
                        orderId={item.orderId}
                      />
                    </Grid>
                  );
                })}
            </Grid>
            <UIBox sx={{ display: "flex", justifyContent: "flex-end" }}>
              <UIButton
                sx={{
                  marginTop: "1rem",
                  padding: "1rem 2rem",
                  fontSize: "1.2rem",
                }}
                variant={"contained"}
                color={"error"}
                onClick={handlePayment}>
                Payment
              </UIButton>
            </UIBox>
          </UIBox>
        </UIBox>
      </UIBox>
    </Card>
  );
}
