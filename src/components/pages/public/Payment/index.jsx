import { Link, useParams } from "react-router-dom";
import styles from "./index.module.scss";
import Invoice from "./Invoice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { axiosAuthentication } from "../../../../../http";
import { Card } from "@mui/material";
import { UIBox, UIButton, UITypography } from "../../../common";
import FrameUI from "../../../../helpers/FrameUI";
export default function Payment() {
  const { session, orderId: order_id } = useParams();
  const info_user = useSelector((state) => state.user.info_user);
  const [orderDetail, setOrderDetail] = useState(null);
  const handleCall = async () => {
    const url = `http://localhost:8000/api/Order/summary?userID=${info_user?.userId}`;
    await axiosAuthentication.get(url).then((res) => {
      if (res.status == 200) {
        setOrderDetail(res.data.find(({ orderId }) => orderId == order_id));
      } else {
        setOrderDetail(null);
      }
    });
  };
  useEffect(() => {
    handleCall();
  }, []);

  const handleCreatePayment = async () => {
    const data = {
      order_Id: order_id,
      method_Payment: "online",
      status: true,
    };
    console.log(data);
    const url = `http://localhost:8000/api/Payment`;
    await axiosAuthentication.post(url, data);
  };
  useEffect(() => {
    if (session != null && session != "fail" && orderDetail != null) {
      handleCreatePayment();
    }
  }, [orderDetail]);
  console.log(orderDetail);
  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        {session != null && session != "fail" ? (
          <>
            {orderDetail != null && (
              <Invoice orderDetail={orderDetail}></Invoice>
            )}
          </>
        ) : (
          <>
            <FrameUI>
              <UIBox
                mt={{ xs: 4, md: 10 }}
                mb={{ xs: 4, md: 8 }}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Card
                  sx={{
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                    padding: "5rem",
                  }}>
                  <UITypography
                    variant="h3"
                    color="error"
                    fontWeight="bold"
                    sx={{ fontSize: "3rem" }}>
                    Payment fail!
                  </UITypography>
                  <UIBox
                    width="100%"
                    height={{ xs: "auto", md: "100%" }}
                    display="flex"
                    justifyContent={"center"}
                    alignItems="flex-end"
                    mt={{ xs: 2, md: 0 }}>
                    <Link to={localStorage.getItem("back_page")}>
                      <UIButton variant="gradient" color="dark">
                        Back
                      </UIButton>
                    </Link>
                  </UIBox>
                </Card>
              </UIBox>
            </FrameUI>
          </>
        )}
      </div>
    </section>
  );
}
