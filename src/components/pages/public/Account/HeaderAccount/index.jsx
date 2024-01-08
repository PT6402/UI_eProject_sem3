import { Card, Grid } from "@mui/material";
import { Button, UIBox, UITypography } from "../../../../common";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { useAuth } from "../../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
export default function HeaderAccount() {
  const info_user = useSelector((state) => state.user.info_user);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = async () => {
    console.log("testhandlelogout");
    navigate("/");
    await logout().then(() => {});
  };
  return (
    <Card
      sx={{
        width: "95%",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; ",
      }}>
      <UIBox p={2}>
        <Grid container spacing={3} flexDirection={"row"}>
          <Grid item xs={12} md={6} lg={6}>
            <UIBox
              height="100%"
              mt={0.5}
              lineHeight={1}
              sx={{
                margin: "0 1rem",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}>
              <UITypography
                variant="h5"
                fontWeight="medium"
                sx={{ fontSize: "2.5rem", color: "#ee0033" }}>
                Hi! {info_user.fullName}
              </UITypography>
              {info_user.tp_contract_id && (
                <UITypography
                  variant="button"
                  color="text"
                  fontWeight="medium"
                  sx={{ fontSize: "1.8rem" }}>
                  {info_user?.tp_contract_id}
                </UITypography>
              )}
            </UIBox>
          </Grid>
          <Grid item xs={12} md={6} lg={6} sx={{ ml: "auto" }}>
            <UIBox
              display="flex"
              justifyContent={{ md: "flex-end" }}
              alignItems="center"
              lineHeight={1}>
              <UIBox mx={1}>
                <Button
                  className={styles.logout_button}
                  onClick={() => handleLogout()}>
                  Logout
                </Button>
              </UIBox>
            </UIBox>
          </Grid>
        </Grid>
      </UIBox>
    </Card>
  );
}
