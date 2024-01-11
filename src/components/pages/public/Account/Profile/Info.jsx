import { Card, Grid } from "@mui/material";
import { UIBox, UIButton, UITypography } from "../../../../common";
import styles from "./index.module.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../../hooks/useAuth";
import { useToast } from "../../../../../hooks/useToast";
import Swal from "sweetalert2";
export default function Info() {
  const { updateProfile, message, error } = useAuth();
  const info_user = useSelector((state) => state.user.info_user);
  const [fullName, setFullName] = useState(info_user?.fullName);
  const [phone, setPhone] = useState(info_user?.phone);
  const [email, setEmail] = useState(info_user?.email);
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
        title: "You want update profile?",
        // text: "Success click check product",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: true,
        confirmButtonText: "Update",
        cancelButtonText: "No",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          if (fullName !== "") {
            const data = {
              user_Id: info_user?.userId,
              fullName: fullName,
              email: email,
            };
            await updateProfile({ data });
            Swal.fire("Success!", "Your profile has been updated.", "success");
          } else {
            Swal.fire("Error!", "fullname empty", "error");
            setFullName(info_user?.fullName);
          }
        } else {
          setFullName(info_user?.fullName);
          setEmail(info_user?.email);
        }
      });
  };
  const handleUpdateProfile = async () => {
    await showSurvey();
  };

  return (
    <>
      <Card
        sx={{
          overflow: "visible",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px ",
        }}>
        <UIBox p={3}>
          <UITypography variant="h3" fontSize={"1.9rem"}>
            Basic Info
          </UITypography>
        </UIBox>
        <UIBox component="form" pb={3} px={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <label className={styles.label}>
                <span>Fullname:</span>
                <input
                  className={styles.input}
                  type="type"
                  placeholder="fullname"
                  required
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  defaultValue={info_user?.fullName}
                />
              </label>
            </Grid>

            <Grid item xs={12} sm={6}>
              <label className={styles.label}>
                <span>Phone:</span>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Phone"
                  required
                  defaultValue={info_user?.phone}
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  disabled
                />
              </label>
            </Grid>
            {/* <Grid item xs={12} sm={4}>
              <label className={styles.label}>
                <span>Email:</span>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="Email"
                  required
                  defaultValue={info_user?.email}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </label>
            </Grid> */}
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
                onClick={handleUpdateProfile}>
                Update Profile
              </UIButton>
            </UIBox>
          </UIBox>
        </UIBox>
      </Card>
    </>
  );
}
