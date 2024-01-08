/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { UIBox } from "../../../../common";
import { Grid } from "@mui/material";
import FormField from "./FormField";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./index.module.scss";
export default function Info({ getInfo }) {
  const info_user = useSelector((state) => state.user.info_user);
  const dataFormStep = useSelector((state) => state.dataFormStep);
  const [info, setInfo] = useState(null);
  useEffect(() => {
    if (info != null) {
      getInfo({
        fullName: info.fullName,
        phone: info.phone,
      });
    }
  }, [info]);
  useEffect(() => {
    setInfo({
      fullName: dataFormStep.value?.fullName || info_user.fullName,
      phone: dataFormStep.value?.phone || info_user.phone,
    });
  }, []);
  return (
    <>
      {info != null && (
        <UIBox>
          <UIBox mt={5}>
            <Grid container spacing={3} justifyContent={"center"}>
              <Grid item xs={12} sm={5}>
                <UIBox mb={4}>
                  {/* <FormField
                type="text"
                label="full name"
                placeholder="enter full name "
                onChange={(e) =>
                  setInfo((prev) => ({ ...prev, fullName: e.target.value }))
                }
                value={info.fullName}
              /> */}
                  <label className={styles.label}>
                    <span>Name:</span>
                    <input
                      className={styles.input}
                      type="text"
                      required
                      onChange={(e) =>
                        setInfo((prev) => ({
                          ...prev,
                          fullName: e.target.value,
                        }))
                      }
                      value={info.fullName}
                    />
                  </label>
                </UIBox>
                <UIBox mb={2}>
                  <label className={styles.label}>
                    <span>Phone:</span>
                    <input
                      className={styles.input}
                      type="text"
                      required
                      onChange={(e) =>
                        setInfo((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      value={info.phone}
                    />
                  </label>
                  {/* <FormField
                type="text"
                label="phone"
                placeholder="enter phone"
                onChange={(e) =>
                  setInfo((prev) => ({ ...prev, phone: e.target.value }))
                }
                value={info.phone}
              /> */}
                </UIBox>
              </Grid>
            </Grid>
          </UIBox>
        </UIBox>
      )}
    </>
  );
}
