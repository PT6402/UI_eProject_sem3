/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, Grid } from "@mui/material";
import { setMiniSidenav } from "context/privateUISlice";
import { PrivateTheme } from "assets/themes";
import { UIBox } from "components/common";
//
import Sidenav from "./Sidenav";
import DashboardLayout from "./DashboardLayout";
import DashboardNavbar from "./DashboardNavbar";
import ModalType from "./Modal";
export default function PrivateLayout({ routes }) {
  const dispatch = useDispatch();
  const privateUI = useSelector((state) => state.privateUI);
  const { miniSidenav } = privateUI;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      dispatch(setMiniSidenav(false));
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      dispatch(setMiniSidenav(true));
      setOnMouseEnter(false);
    }
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);
  return (
    <>
      <ModalType />
      <ThemeProvider theme={PrivateTheme}>
        <CssBaseline />
        <Sidenav
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
        <DashboardLayout>
          <DashboardNavbar />
          <UIBox py={3}>
            <Grid container>
              <Outlet />
            </Grid>
          </UIBox>
          {/* <Footer /> */}
        </DashboardLayout>
      </ThemeProvider>
    </>
  );
}
