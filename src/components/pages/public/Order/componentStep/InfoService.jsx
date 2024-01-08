/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { UIBox, UIButton } from "../../../../common";
import { Card, Grid } from "@mui/material";
import FormField from "./FormField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";
import ItemServices from "./ItemServices";
import { useCoupon } from "../../../../../hooks/useCoupon";
import { setValue } from "../../../../../context/dataFormStep";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
export default function InfoService({ getInfoServices }) {
  const dispatch = useDispatch();
  const dataFormStep = useSelector((state) => state.dataFormStep);
  const deposit = dataFormStep.value?.duration.deposit_connect;
  const pricePack = dataFormStep.value?.duration.duration.price;
  const { gets } = useCoupon();
  const [coupons, setCoupons] = useState(null);
  const [numbConnect, setNumConnect] = useState(
    dataFormStep.value?.numbConnect
  );
  // const [defaultTotal, setDefaultTotal] = useState(
  //   dataFormStep.value?.totalPrice != null
  // );
  const [couponCheck, setCouponCheck] = useState(null);
  const handleCallConnect = async () => {
    await gets().then((res) => setCoupons(res));
  };
  const [totalPrice, setTotalPrice] = useState(
    dataFormStep.value?.totalPrice || pricePack + deposit
  );
  // console.log(dataFormStep.value);
  useEffect(() => {
    handleCallConnect();
  }, []);
  const handleCal = (coupon, numb_Connect) => {
    const deposit = dataFormStep.value?.duration.deposit_connect;
    const pricePack = dataFormStep.value?.duration.duration.price;
    console.log(numb_Connect);
    if (numb_Connect != undefined) {
      if (coupon != null) {
        setTotalPrice(
          pricePack + (deposit - deposit * (coupon.percent_discount / 100))
        );
        setCouponCheck(coupon);
      } else {
        setTotalPrice(pricePack + deposit);
      }
    }
    setNumConnect(numb_Connect);
  };
  // useEffect(() => {
  //   if (defaultTotal) {
  //     setDefaultTotal(false);
  //   }
  // }, [numbConnect]);
  const handelGetData = () => {
    getInfoServices({
      totalPrice,
      numbConnect,
      couponCheck,
    });
  };
  useEffect(() => {
    handelGetData();
  }, [numbConnect]);
  // console.log(defaultTotal);
  return (
    <>
      {coupons != null && (
        <UIBox
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <UIBox
            mb={3}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
            }}>
            <Card
              sx={{
                width: "fit-content",
                padding: "2rem",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}>
              <UIBox
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Grid container spacing={1} flexDirection={"column"}>
                  <Grid item xs={12} sm={4}>
                    <Link
                      to={`/page-services/${dataFormStep.value?.duration?.id_connect}`}>
                      <UIButton
                        color="black"
                        sx={{
                          fontSize: "1.1rem",
                          fontFamily: " Monument Extended, sans-serif",
                          padding: ".1rem .5rem",
                          borderRadius: ".5rem",
                          color: "#fff",
                          transition: " all 0.1s ease-in",
                          "&:active": {
                            transform: " scale(0.9)",
                          },
                          "&:hover": {
                            background: "#000",
                            color: "#fff",
                            borderColor: "#000",
                          },
                          position: "relative",
                          top: "0",
                        }}>
                        <IoIosArrowRoundBack size={30} />
                        Edit
                      </UIButton>
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <ItemServices
                      title={dataFormStep.value?.duration?.name_connect}
                      deposit={dataFormStep.value?.duration?.deposit_connect}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <ItemServices
                      title="Package"
                      duration={dataFormStep.value?.duration?.duration.time}
                      price={dataFormStep.value?.duration?.duration.price}
                      validate={dataFormStep.value?.duration?.duration.validate}
                    />
                  </Grid>
                </Grid>
              </UIBox>
            </Card>
            <Card
              sx={{
                width: "50%",
                padding: "2rem",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}>
              <UIBox
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "2rem",
                }}>
                <ItemServices
                  width={"30rem"}
                  title="Coupon number connect "
                  coupons={coupons}
                />

                <ItemServices input handleCal={handleCal} />
              </UIBox>
            </Card>
            <Card
              sx={{
                width: "fit-content",
                padding: "2rem",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
              }}>
              <UIBox
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Grid
                  container
                  spacing={1}
                  flexDirection={"column"}
                  alignItems={"flex-start"}>
                  <Grid item xs={12} sm={4}>
                    <ItemServices
                      title="Total price"
                      tax={12.24}
                      totalDeposit={deposit}
                      totalDura={pricePack}
                      total={`${totalPrice}$`}
                    />
                  </Grid>
                </Grid>
                {/* <Grid
                container
                spacing={1}
                flexDirection={"column"}
                alignItems="center">
                <Grid item xs={12} sm={4}>
                  <ItemServices
                    title="sales"
                    count="$230,220"
                    percentage={{
                      color: "success",
                      value: "+55%",
                      label: "since last month",
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ItemServices
                    title="sales"
                    count="$230,220"
                    percentage={{
                      color: "success",
                      value: "+55%",
                      label: "since last month",
                    }}
                  />
                </Grid>
              </Grid> */}
              </UIBox>
            </Card>
          </UIBox>
        </UIBox>
      )}
    </>
  );
}
