import { Card, Grid } from "@mui/material";
import { UIBox, UIButton, UITypography } from "../../../../common";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "../../../../../hooks/useToast";
import { useAuth } from "../../../../../hooks/useAuth";
import Swal from "sweetalert2";
export default function ChangePassword() {
  const info_user = useSelector((state) => state.user.info_user);
  const [currentPass, setCurrentPass] = useState();
  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const { changePass, error } = useAuth();
  const [notify, setNotify] = useState(false);
  const { sendToast } = useToast();

  const showSurvey = async () => {
    const newSwal = Swal.mixin({
      customClass: {
        confirmButton: "button button-success",
        cancelButton: "button button-error",
      },
      buttonsStyling: false,
    });

    newSwal
      .fire({
        title: "You want change password?",
        // text: "Success click check product",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: true,
        confirmButtonText: "Update",
        cancelButtonText: "No",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          if (currentPass != "" || newPass != "" || confirmPass != "") {
            const data = {
              info_user: info_user.userId,
              currentPass: currentPass,
              newPass: newPass,
              confirmPass: confirmPass,
            };
            await changePass({ data }).then(() => {
              setConfirmPass("");
              setCurrentPass("");
              setNewPass("");
              return;
            });
            setNotify(true);
          } else {
            Swal.fire("Error!", "empty field", "error");
            setNewPass("");
            setCurrentPass("");
            setConfirmPass("");
          }
        } else {
          setNewPass("");
          setCurrentPass("");
          setConfirmPass("");
        }
      });
  };

  const handleChangePass = async () => {
    await showSurvey();
  };
  useEffect(() => {
    if (notify) {
      if (error) {
        Swal.fire("Error!", error, "error");
        setNotify(false);
      } else {
        Swal.fire("Success!", "Your password has been updated.", "success");
        setNotify(false);
      }
    }
  }, [notify]);
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
                type="password"
                placeholder="Current password"
                required
                onChange={(e) => setCurrentPass(e.target.value)}
                value={currentPass}
              />
            </label>
          </Grid>
          <Grid item xs={12}>
            <label className={styles.label}>
              <span>New password:</span>
              <input
                className={styles.input}
                type="password"
                placeholder="new password"
                required
                onChange={(e) => setNewPass(e.target.value)}
                value={newPass}
              />
            </label>
          </Grid>
          <Grid item xs={12}>
            <label className={styles.label}>
              <span>Confirm password:</span>
              <input
                className={styles.input}
                type="password"
                placeholder="Confirm Password"
                required
                onChange={(e) => setConfirmPass(e.target.value)}
                value={confirmPass}
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
              }}
              onClick={handleChangePass}>
              update password
            </UIButton>
          </UIBox>
        </UIBox>
      </UIBox>
    </Card>
  );
}
