/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { UIBox, UIButton } from "../../../../common";
import { AppBar, Tab, Tabs } from "@mui/material";
import breakpoints from "../../../../../assets/themes/private/base/breakpoints";
import { useDispatch, useSelector } from "react-redux";
import {
  setStatus,
  setType,
  setValue,
} from "../../../../../context/modalSlice";
import CreatePackage from "./CreatePackage";
import { setCurrentConnect } from "../../../../../context/packageSlice";
export default function HeaderPackage({ connectType }) {
  const dispatch = useDispatch();
  const currentConnectType = useSelector(
    (state) => state.packageSlice.currentConnectType
  );
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const handleSetTabValue = (event, newValue) => {
    if (currentConnectType != null) {
      setTabValue(newValue);
      dispatch(setCurrentConnect(newValue));
    } else {
      dispatch(setCurrentConnect(newValue));
      return setTabValue(newValue);
    }
  };
  const [tabValue, setTabValue] = useState(currentConnectType || 0);
  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }
    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);
  return (
    <>
      {connectType != null && (
        <UIBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={1}
          mt={2}>
          <UIBox>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ background: "transparent" }}>
                {connectType.map((item, key) => {
                  if (key == 1) {
                    return (
                      <Tab
                        key={key}
                        label={item.name}
                        sx={() => ({ padding: "0 1rem" })}></Tab>
                    );
                  } else {
                    return <Tab key={key} label={item.name} />;
                  }
                })}
              </Tabs>
            </AppBar>
          </UIBox>
          <UIBox ml={1} display="flex" justifyContent="center">
            <UIButton
              color="info"
              size="small"
              sx={() => ({ marginRight: "1rem" })}
              onClick={() => {
                dispatch(setStatus(true));
                dispatch(setType(CreatePackage));
                dispatch(setValue(tabValue + 1));
              }}>
              + Package
            </UIButton>
          </UIBox>
        </UIBox>
      )}
    </>
  );
}
