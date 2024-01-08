/* eslint-disable react/prop-types */
import { UIBox } from "../../../../common";
import { Card, Divider, Grid } from "@mui/material";
import UserInformation from "./components/UserInformation";
import OrderSummary from "./components/OrderSummary";
import FrameUI from "../../../../../helpers/FrameUI";
import Header from "./components/Header";
import { axiosAuthentication } from "../../../../../../http";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
export default function OrderDetail({ orderDetail }) {
  function formatNgayThangNam(chuoiNgay) {
    let ngayGoc = new Date(chuoiNgay);
    let ngay = ngayGoc.getDate();
    let thang = ngayGoc.getMonth() + 1;
    let nam = ngayGoc.getFullYear();
    let ngayMoiFormat =
      ngay.toString().padStart(2, "0") +
      "/" +
      thang.toString().padStart(2, "0") +
      "/" +
      nam.toString();
    return ngayMoiFormat;
  }
  async function initializeStripe(pubKey) {
    const stripe = await loadStripe(pubKey);
    return stripe;
  }
  async function checkout({ pubKey, sessionId }) {
    const stripe = await initializeStripe(pubKey);
    stripe.redirectToCheckout({ sessionId });
  }
  const handlePayment = async () => {
    const url = `http://localhost:8000/api/Stripe/${orderDetail[0].orderId}`;
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
    <>
      {orderDetail != null && (
        <FrameUI>
          <UIBox p={2} sx={{ width: "100%" }}>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} lg={12}>
                <Card sx={{ padding: "2rem" }}>
                  <UIBox pt={2} px={2}>
                    <Header
                      order_id={orderDetail[0].orderId}
                      createDate={formatNgayThangNam(
                        orderDetail[0].createdDate
                      )}
                      status={orderDetail[0].status}
                      handlePayment={handlePayment}
                    />
                  </UIBox>
                  <Divider />
                  <UIBox pt={1} pb={3} px={2}>
                    <UIBox>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={5}>
                          <UIBox>
                            <UserInformation
                              fullName={orderDetail[0].fullName}
                              phone={orderDetail[0].phone}
                              connect_type_name={orderDetail[0].connectTypeName}
                              packages={orderDetail[0].packageName}
                              time={orderDetail[0].durationTime}
                              validate={orderDetail[0].validate}
                            />
                          </UIBox>
                        </Grid>
                        <Grid item xs={12} lg={3} sx={{ ml: "auto" }}>
                          <OrderSummary
                            packagePrice={orderDetail[0].packagePrice}
                            deposit={orderDetail[0].deposit}
                            coupon={orderDetail[0].coupon}
                            tax={orderDetail[0].tax}
                            totalPrice={orderDetail[0].totalPrice}
                          />
                        </Grid>
                      </Grid>
                    </UIBox>
                  </UIBox>
                </Card>
              </Grid>
            </Grid>
          </UIBox>
        </FrameUI>
      )}
    </>
  );
}
