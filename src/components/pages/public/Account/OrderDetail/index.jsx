/* eslint-disable react/prop-types */
import { UIBox } from "../../../../common";
import { Card, Divider, Grid } from "@mui/material";
import UserInformation from "./components/UserInformation";
import OrderSummary from "./components/OrderSummary";
import FrameUI from "../../../../../helpers/FrameUI";
import Header from "./components/Header";
import { axiosAuthentication } from "../../../../../../http";
import { loadStripe } from "@stripe/stripe-js";
import ButtonSend from "./components/Button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function OrderDetail() {
  const modalType = useSelector((state) => state.modalType);
  const info_user = useSelector((state) => state.user.info_user);
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
  const handlePayment = async (orderId) => {
    localStorage.setItem("back_page", "/account");
    const url = `http://localhost:8000/api/Stripe/${orderId}`;
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
  const [orderDetail, setOrderDetail] = useState(null);
  const handleCall = async () => {
    const url = `http://localhost:8000/api/Order/summary?userID=${info_user?.userId}`;
    await axiosAuthentication.get(url).then((res) => {
      if (res.status == 200) {
        setOrderDetail(res.data);
      } else {
        setOrderDetail(null);
      }
    });
  };
  useEffect(() => {
    handleCall();
  }, [modalType.statusModal]);
  return (
    <>
      {orderDetail != null && (
        <FrameUI>
          <UIBox p={2} sx={{ width: "100%" }}>
            <Grid container spacing={3} justifyContent="center">
              {orderDetail.map((item, index) => (
                <Grid item xs={12} lg={12} key={index}>
                  <Card sx={{ padding: "2rem" }}>
                    <UIBox pt={2} px={2}>
                      <Header
                        order_id={item.orderId}
                        createDate={formatNgayThangNam(item.createdDate)}
                        status={item.status}
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
                                fullName={item.fullName}
                                phone={item.phone}
                                connect_type_name={item.connectTypeName}
                                packages={item.packageName}
                                time={item.durationTime}
                                validate={item.validate}
                              />
                            </UIBox>
                          </Grid>
                          <Grid item xs={12} lg={3} sx={{ ml: "auto" }}>
                            <OrderSummary
                              packagePrice={item.packagePrice}
                              deposit={item.deposit}
                              coupon={item.coupon}
                              tax={item.tax}
                              totalPrice={item.totalPrice}
                            />
                            {item.status == "Finish" &&
                              !item.statusFeedback && (
                                <ButtonSend item={item} />
                              )}
                          </Grid>
                        </Grid>
                      </UIBox>
                    </UIBox>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </UIBox>
        </FrameUI>
      )}
    </>
  );
}
