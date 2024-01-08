/* eslint-disable react/prop-types */
import { Card } from "@mui/material";
import { UIBox, UITypography } from "../../../common";
import SpaceShip from "../../../models/private/Icons/SpaceShip";
import Profile from "./Profile";
import { useEffect, useState } from "react";
import TpContract from "./TpContract";
import Services from "./Services";
import { useSelector } from "react-redux";
import OrderDetail from "./OrderDetail";
import { axiosAuthentication } from "../../../../../http";
import { NULL } from "sass";

export default function Sidenav({ handleGetComponent }) {
  const info_user = useSelector((state) => state.user.info_user);
  const [isCurrent, setIsCurrent] = useState(1);
  const [orderDetail, setOrderDetail] = useState(null);
  const sidenavItems = [
    { id: 1, icon: <SpaceShip />, label: "Profile", component: <Profile /> },
  ];
  const handleCall = async () => {
    const url = `http://localhost:8000/api/Order/summary?userID=${info_user?.userId}`;
    await axiosAuthentication.get(url).then((res) => {
      if (res.status == 200) {
        setOrderDetail(res.data.model);
      } else {
        setOrderDetail(null);
      }
    });
  };
  useEffect(() => {
    handleCall();
  }, []);
  console.log(orderDetail);
  const handleCheckService = () => {
    if (orderDetail != null) {
      sidenavItems.push({
        id: 3,
        icon: <SpaceShip />,
        label: "order ",
        component: <OrderDetail orderDetail={orderDetail} />,
      });
    }

    return sidenavItems;
  };
  const renderSidenavItems = handleCheckService().map(
    ({ icon, label, component, id }, key) => {
      const itemKey = `item-${key}`;

      return (
        <UIBox
          key={itemKey}
          component="li"
          pt={key === 0 ? 0 : 1}
          sx={{ boxSizing: "border-box" }}>
          <UITypography
            component="span"
            variant="button"
            fontWeight="regular"
            color="text"
            textTransform="capitalize"
            sx={({
              borders: { borderRadius },
              functions: { pxToRem },
              palette: { light },
              transitions,
            }) => ({
              display: "flex",
              alignItems: "center",
              borderRadius: borderRadius.md,
              padding: `${pxToRem(10)} ${pxToRem(16)}`,
              transition: transitions.create("background-color", {
                easing: transitions.easing.easeInOut,
                duration: transitions.duration.shorter,
              }),
              boxSizing: "border-box",
              fontSize: "1.5rem",
              // "&:hover": {
              //   border: isCurrent != id && ".1rem solid grey",
              // },
              cursor: isCurrent != id && "pointer",
              backgroundColor: isCurrent == id ? light.main : "",
            })}
            onClick={() => {
              setIsCurrent(id);
              handleGetComponent(component);
            }}>
            <UIBox mr={1.5} lineHeight={1}>
              {icon}
            </UIBox>
            {label}
          </UITypography>
        </UIBox>
      );
    }
  );
  return (
    <Card
      sx={{
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
        position: "sticky",
        top: "7rem",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}>
      <UIBox
        component="ul"
        display="flex"
        flexDirection="column"
        p={2}
        m={0}
        sx={{ listStyle: "none" }}>
        {renderSidenavItems}
      </UIBox>
    </Card>
  );
}
