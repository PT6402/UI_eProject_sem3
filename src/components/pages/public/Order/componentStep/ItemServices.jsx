/* eslint-disable react/prop-types */
import { Card, Grid } from "@mui/material";
import { UIBadge, UIBadgeDot, UIBox, UITypography } from "../../../../common";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { useCoupon } from "../../../../../hooks/useCoupon";
import { useSelector } from "react-redux";
export default function ItemServices({
  title,
  count,
  percentage,
  width,
  input,
  ...rest
}) {
  const dataFormStep = useSelector((state) => state.dataFormStep);
  const { gets } = useCoupon();
  const [coupons, setCoupons] = useState(null);
  const handleCallConnect = async () => {
    await gets().then((res) => setCoupons(res));
  };
  useEffect(() => {
    handleCallConnect();
  }, []);
  const [numbConnect, setNumbConnect] = useState(null);
  const [couponSelect, setCouponSelect] = useState(null);
  const handleCheckCoupon = async () => {
    if (coupons != null) {
      if (numbConnect != "") {
        return coupons.map((item) => {
          if (numbConnect > item.to && numbConnect <= item.from) {
            return item;
          } else {
            return null;
          }
        });
      } else {
        return null;
      }
    }
  };

  useEffect(() => {
    handleCheckCoupon().then((res) => {
      if (res?.length != null) {
        const check = res.find((item) => item != null);
        if (check) {
          setCouponSelect(check);
        }
      } else {
        setCouponSelect(null);
      }
    });
    // const delayDebounceFn = setTimeout(() => {
    // }, 500);
    // return () => clearTimeout(delayDebounceFn);
  }, [numbConnect]);

  useEffect(() => {
    if (numbConnect != null) {
      if (rest?.handleCal) {
        rest?.handleCal(couponSelect, numbConnect);
      }
    }
    // if (couponSelect != null) {
    //   rest?.handleCal(
    //     dataFormStep.value?.couponCheck,
    //     dataFormStep.value?.numbConnect
    //   );
    // }
    // if (coif()uponSelect != null) {
    // }
  }, [couponSelect, numbConnect]);
  return (
    <Card
      sx={{
        boxShadow:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        minWidth: width,
        width: "fit-content",
        whiteSpace: "nowrap",
      }}>
      <UIBox p={2} sx={{ width: "100%" }}>
        <Grid container>
          <Grid item xs={12}>
            <>
              {!input ? (
                <>
                  <UIBox mb={0.5} lineHeight={1}>
                    <UITypography
                      variant="button"
                      fontWeight="bold"
                      color="text"
                      textTransform="capitalize"
                      sx={{ fontSize: "1.3rem" }}>
                      {title}
                    </UITypography>
                  </UIBox>
                  <UIBox lineHeight={1}>
                    {rest.deposit && (
                      <UIBadgeDot
                        color={"error"}
                        size="lg"
                        badgeContent={`Deposit: ${rest.deposit}$`}
                        font={{
                          color: "text",
                          weight: "medium",
                        }}
                        fontSizeCus={"1.2rem"}
                        px={0}
                      />
                    )}
                    {rest.duration && rest.price && (
                      <>
                        <UIBadgeDot
                          color={"error"}
                          size="lg"
                          badgeContent={`Time: ${rest.duration}`}
                          font={{
                            color: "text",
                            weight: "medium",
                          }}
                          fontSizeCus={"1.2rem"}
                          px={0}
                        />
                        <UIBadgeDot
                          color={"error"}
                          size="lg"
                          badgeContent={`Price: ${rest.price}$`}
                          font={{
                            color: "text",
                            weight: "medium",
                          }}
                          fontSizeCus={"1.2rem"}
                          px={0}
                        />
                        {rest.validate && (
                          <UIBadgeDot
                            color={"error"}
                            size="lg"
                            badgeContent={`Validate: ${rest.validate}`}
                            font={{
                              color: "text",
                              weight: "medium",
                            }}
                            fontSizeCus={"1.2rem"}
                            px={0}
                          />
                        )}
                      </>
                    )}
                    {rest.coupons &&
                      rest.coupons.map((item) => {
                        return (
                          <div key={item.id}>
                            <UIBadgeDot
                              color={"error"}
                              size="lg"
                              badgeContent={`${item.to}-${item.from}: -${item.percent_discount}% deposit of connect`}
                              font={{
                                color: "text",
                                weight: "medium",
                              }}
                              fontSizeCus={"1.2rem"}
                              px={0}
                            />
                          </div>
                        );
                      })}
                    {!(rest.duration && rest.price) && (
                      <UITypography variant="h5" fontWeight="bold">
                        {rest?.tax && (
                          <>
                            <UIBadgeDot
                              color={"error"}
                              size="lg"
                              badgeContent={`Deposit: ${rest.totalDeposit}$`}
                              font={{
                                color: "text",
                                weight: "medium",
                              }}
                              fontSizeCus={"1.2rem"}
                              px={0}
                            />
                            <UIBadgeDot
                              color={"error"}
                              size="lg"
                              badgeContent={`Package: ${rest.totalDura}$`}
                              font={{
                                color: "text",
                                weight: "medium",
                              }}
                              fontSizeCus={"1.2rem"}
                              px={0}
                            />
                            <UIBadgeDot
                              color={"error"}
                              size="lg"
                              badgeContent={`Coupon: -${
                                (rest.totalDeposit * rest.totalCoupon) / 100
                              }$`}
                              font={{
                                color: "text",
                                weight: "medium",
                              }}
                              fontSizeCus={"1.2rem"}
                              px={0}
                            />
                            <UIBadgeDot
                              color={"error"}
                              size="lg"
                              badgeContent={`Tax:${rest.tax}%`}
                              font={{
                                color: "text",
                                weight: "medium",
                              }}
                              fontSizeCus={"1.2rem"}
                              px={0}
                            />
                          </>
                        )}
                      </UITypography>
                    )}
                    {rest?.total && (
                      <UIBadge
                        variant="contained"
                        color="error"
                        size="2rem"
                        colorCus="#FFFFFF"
                        badgeContent={`${rest?.total}`}
                        container
                        paddingCus="1rem 2.5rem"
                      />
                    )}
                  </UIBox>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}>
                  <UIBox mb={0.5} lineHeight={1}>
                    <UITypography
                      variant="button"
                      fontWeight="medium"
                      color="text"
                      textTransform="capitalize">
                      Number connect
                    </UITypography>
                  </UIBox>
                  <label className={styles.label}>
                    <input
                      className={styles.input}
                      type="number"
                      required
                      onChange={(e) => setNumbConnect(e.target.value)}
                      value={numbConnect}
                      defaultValue={dataFormStep.value?.numbConnect}
                    />
                  </label>
                </div>
              )}
            </>
          </Grid>
        </Grid>
      </UIBox>
    </Card>
  );
}
