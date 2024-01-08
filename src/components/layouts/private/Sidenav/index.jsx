/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import Icon from "@mui/material/Icon";
import { UIBox, UITypography } from "components/common";
import { useDispatch, useSelector } from "react-redux";
import { setMiniSidenav } from "context/privateUISlice";
//
import SidenavCollapse from "./SidenavCollapse";
import SidenavList from "./SidenavList";
import SidenavItem from "./SidenavItem";
import SidenavRoot from "./SidenavRoot";
import sidenavLogoLabel from "./styles/sidenav";
import { Link } from "react-router-dom/dist";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const privateUI = useSelector((state) => state.privateUI);
  const { miniSidenav, transparentSidenav } = privateUI;
  const [openCollapse, setOpenCollapse] = useState(false);
  const [openNestedCollapse, setOpenNestedCollapse] = useState(false);
  const collapseName = pathname.split("/").slice(1)[0];
  const collapseName1 = pathname.split("/").slice(2)[0];
  const itemName = pathname.split("/").slice(2)[1];

  const closeSidenav = () => dispatch(setMiniSidenav(true));

  useEffect(() => {
    function handleMiniSidenav() {
      dispatch(setMiniSidenav(window.innerWidth < 1200));
    }
    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();

    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse) => {
    const template = collapse.map(({ name, route, key, isShow }) => {
      if (isShow) {
        return (
          <NavLink to={route} key={key} sx={{ textDecoration: "none" }}>
            <SidenavItem name={name} active={route === pathname} nested />
          </NavLink>
        );
      }
    });

    return template;
  };
  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses) =>
    collapses.map(({ name, collapse, route, key, link, component }) => {
      let returnValue;
      if (link && route && component) {
        returnValue = (
          <NavLink to={route} key={key} sx={{ textDecoration: "none" }}>
            <SidenavItem
              key={key}
              name={name}
              active={key === itemName}></SidenavItem>
          </NavLink>
        );
      } else if (collapse) {
        returnValue = (
          <SidenavItem
            key={key}
            name={name}
            active={key === itemName}
            open={openNestedCollapse === name}
            onClick={() =>
              openNestedCollapse === name
                ? setOpenNestedCollapse(false)
                : setOpenNestedCollapse(name)
            }>
            {renderNestedCollapse(collapse)}
          </SidenavItem>
        );
      } else {
        returnValue = (
          <NavLink to={route} key={key} sx={{ textDecoration: "none" }}>
            <SidenavItem name={name} active={key === itemName} />
          </NavLink>
        );
      }
      return <SidenavList key={key}>{returnValue}</SidenavList>;
    });

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, collapse, noCollapse, key, index, route }) => {
      let returnValue;

      if (type === "collapse") {
        if (noCollapse && route) {
          if (index) {
            returnValue = (
              <NavLink to={route} key={key}>
                <SidenavCollapse
                  name={name}
                  icon={icon}
                  noCollapse={noCollapse}
                  active={pathname.split("/").length == 2}>
                  {collapse ? renderCollapse(collapse) : null}
                </SidenavCollapse>
              </NavLink>
            );
          } else {
            returnValue = (
              <NavLink to={route} key={key}>
                <SidenavCollapse
                  name={name}
                  icon={icon}
                  noCollapse={noCollapse}
                  active={key === collapseName1}>
                  {collapse ? renderCollapse(collapse) : null}
                </SidenavCollapse>
              </NavLink>
            );
          }
        } else {
          returnValue = (
            <SidenavCollapse
              key={key}
              name={name}
              icon={icon}
              active={key === collapseName1}
              open={openCollapse === key}
              onClick={() =>
                openCollapse === key
                  ? setOpenCollapse(false)
                  : setOpenCollapse(key)
              }>
              {collapse ? renderCollapse(collapse) : null}
            </SidenavCollapse>
          );
        }
      } else if (type === "title") {
        returnValue = (
          <UITypography
            key={key}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            opacity={0.6}
            pl={3}
            mt={2}
            mb={1}
            ml={1}>
            {title}
          </UITypography>
        );
      } else if (type === "divider") {
        returnValue = <Divider key={key} />;
      }

      return returnValue;
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, miniSidenav }}>
      <UIBox pt={3} pb={1} px={4} textAlign="center">
        <UIBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}>
          <UITypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </UITypography>
        </UIBox>
        <UIBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && (
            <UIBox
              component="img"
              src={brand}
              alt="Soft UI Logo"
              width="2rem"
            />
          )}
          <UIBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}>
            <UITypography component="h6" variant="button" fontWeight="medium">
              {brandName}
            </UITypography>
          </UIBox>
        </UIBox>
      </UIBox>
      <Divider />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}
Sidenav.defaultProps = {
  color: "info",
  brandName: "Nexus",
};
Sidenav.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
