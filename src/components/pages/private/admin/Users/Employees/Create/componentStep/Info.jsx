/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { UIBox } from "../../../../../../../common";
import { Grid } from "@mui/material";
import FormField from "./FormField";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function Info({ getInfo }) {
  const dataFormStep = useSelector((state) => state.dataFormStep);
  const [info, setInfo] = useState({
    email: dataFormStep.value?.email || "",
    fullName: dataFormStep.value?.fullName || "",
    phone: dataFormStep.value?.phone || "",
  });
  useEffect(() => {
    getInfo(info);
  }, [info]);
  return (
    <UIBox>
      <UIBox width="80%" textAlign="center" mx="auto" mb={4}></UIBox>
      <UIBox mt={2}>
        <Grid container spacing={3} justifyContent={"center"}>
          <Grid item xs={12} sm={5}>
            <UIBox mb={2}>
              <FormField
                type="text"
                label="full name"
                placeholder="enter full name "
                onChange={(e) =>
                  setInfo((prev) => ({ ...prev, fullName: e.target.value }))
                }
                value={info.fullName}
              />
            </UIBox>
            <UIBox mb={2}>
              <FormField
                type="text"
                label="phone"
                placeholder="enter phone"
                onChange={(e) =>
                  setInfo((prev) => ({ ...prev, phone: e.target.value }))
                }
                value={info.phone}
              />
            </UIBox>
            <UIBox>
              <FormField
                type="text"
                label="email"
                placeholder="enter email"
                onChange={(e) =>
                  setInfo((prev) => ({ ...prev, email: e.target.value }))
                }
                value={info.email}
              />
            </UIBox>
          </Grid>
        </Grid>
      </UIBox>
    </UIBox>
  );
}
