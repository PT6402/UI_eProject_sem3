import { Card, Grid } from "@mui/material";
import { UIBox, UIButton, UITypography } from "../../../../common";
import styles from "./index.module.scss";
export default function ChangePassword() {
  return (
    <Card sx={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
      <UIBox p={3}>
        <UITypography variant="h3" sx={{ fontSize: "1.9rem" }}>
          Change Password
        </UITypography>
      </UIBox>
      <UIBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <label className={styles.label}>
              <span>Current password:</span>
              <input
                className={styles.input}
                type="passowrd"
                placeholder="Current password"
                required
              />
            </label>
          </Grid>
          <Grid item xs={12}>
            <label className={styles.label}>
              <span>New password:</span>
              <input
                className={styles.input}
                type="passowrd"
                placeholder="new password"
                required
              />
            </label>
          </Grid>
          <Grid item xs={12}>
            <label className={styles.label}>
              <span>Phone:</span>
              <input
                className={styles.input}
                type="passowrd"
                placeholder="Confirm Password"
                required
              />
            </label>
          </Grid>
        </Grid>

        <UIBox
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
          flexWrap="wrap"
          mt={5}>
          <UIBox ml="auto">
            <UIButton
              color="black"
              sx={{
                fontSize: "1.5rem",
                fontFamily: " Monument Extended, sans-serif",
                padding: "1rem 2rem",
                borderRadius: "1rem",
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
              }}>
              update password
            </UIButton>
          </UIBox>
        </UIBox>
      </UIBox>
    </Card>
  );
}
