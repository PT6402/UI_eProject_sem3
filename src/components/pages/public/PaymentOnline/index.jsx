import { Card, Grid } from "@mui/material";
import FrameUI from "../../../../helpers/FrameUI";
import { UIBox } from "../../../common";
import HeaderPayment from "./HeaderPayment";
import styles from "./index.module.scss";
import ItemContract from "./ItemContact";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { CheckPhone } from "../../../../helpers/CheckAccountPhone";
import axios from "axios";
import { axiosAuthentication } from "../../../../../http";

export default function OnlinePayment() {
  const phoneInputRef = useRef();
  const [phoneInput, setPhoneInput] = useState("");
  const [debouncedValue] = useDebounce(phoneInput, 1000);
  const [dataContract, setDataContract] = useState(null);
  const handleSubmit = async () => {
    const url = `http://localhost:8000/api/Payment/${phoneInput}`;
    await axiosAuthentication
      .get(url)
      .then((res) => {
        if (res.status == 200) {
          setDataContract(res.data.model);
        } else {
          setDataContract(null);
        }
      })
      .catch(() => {
        setDataContract(null);
      });
  };
  useEffect(() => {
    CheckPhone(phoneInputRef);
    const check = CheckPhone(phoneInputRef);
    if (check.error == null) {
      handleSubmit();
    } else {
      setDataContract(null);
    }
  }, [debouncedValue]);
  return (
    <>
      {
        <FrameUI>
          <section>
            <div className={`${styles.container} main-container`}>
              <div className={styles.welcome_wrapper}>
                <HeaderPayment />
              </div>
              <UIBox
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <UIBox>
                  <Card
                    sx={{
                      overflow: "visible",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}>
                    <UIBox p={3}>
                      <label className={styles.label}>
                        <span>Phone/Account:</span>
                        <input
                          className={styles.input}
                          type="text"
                          placeholder="enter phone/account"
                          required
                          value={phoneInput}
                          style={{ marginTop: "1rem" }}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          ref={phoneInputRef}
                        />
                      </label>
                    </UIBox>
                  </Card>
                </UIBox>
              </UIBox>

              <UIBox
                sx={{ display: "flex", justifyContent: "center" }}
                mt={4}
                width={"100%"}>
                <UIBox width={"90%"}>
                  <Grid container justifyContent={"center"}>
                    <Grid item xs={12} md={6}>
                      {dataContract != null && (
                        <ItemContract
                          contract_id={dataContract.tP_Contract_Id}
                          phone={dataContract.phone}
                          fullname={dataContract.fullName}
                          serviceDtos={dataContract.serviceDtos}
                        />
                      )}
                    </Grid>
                  </Grid>
                </UIBox>
              </UIBox>
            </div>
          </section>
        </FrameUI>
      }
    </>
  );
}
