/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { UIBox, UITypography } from "../../../common";
import { AppBar, Card, Grid, Tab, Tabs } from "@mui/material";
import breakpoints from "../../../../assets/themes/private/base/breakpoints";
import curved0 from "assets/images/private/curved-images/curved0.jpg";
export default function Header({ name, packages, handleSort }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  useEffect(() => {
    handleSort(tabValue);
  }, [tabValue]);
  return (
    <UIBox position="relative">
      {/* <DashboardNavbar absolute light /> */}
      <UIBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="15.75rem"
        borderRadius="xxl"
        sx={{
          backgroundImage: ({
            functions: { rgba, linearGradient },
            palette: { gradients },
          }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(60px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) =>
            rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -7,
          mx: 3,
          py: 3,
          px: 2,
        }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <UIBox height="100%" mt={0.5} lineHeight={1}>
              <UITypography variant="h2" fontWeight="bold">
                {name}
              </UITypography>
            </UIBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{ background: "transparent" }}>
                {packages.map((item) => {
                  return (
                    <Tab
                      key={item.package_id}
                      label={item.namePackage}
                      sx={{ fontSize: "1.5rem", whiteSpace: "wrap" }}
                    />
                  );
                })}
                <Tab
                  label={"ALL"}
                  sx={{
                    fontSize: "1.5rem",
                    whiteSpace: "wrap",
                    padding: "1rem 3rem",
                  }}
                />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
      </Card>
    </UIBox>
  );
}
