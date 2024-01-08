/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { UIBox } from "../../../../../../../common";
import { Grid } from "@mui/material";
import FormField from "./FormField";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function Info({ getInfo, getData }) {
  const dataFormStep = useSelector((state) => state.dataFormStep);
  const [info, setInfo] = useState({
    email: dataFormStep.value?.email || getData?.email || "",
    fullName: dataFormStep.value?.fullName || getData?.fullName || "",
    phone: dataFormStep.value?.phone || getData?.phone || "",
  });
  useEffect(() => {
    getInfo(info);
  }, [info]);
  return (
    <UIBox>
      <UIBox width="80%" textAlign="center" mx="auto" mb={4}></UIBox>
      <UIBox mt={2}>
        <Grid container spacing={3} justifyContent={"center"}>
          {/* <Grid item xs={12} sm={4} container justifyContent="center">
            <UIBox position="relative" height="max-content" mx="auto">
              <UIAvatar
                src={team2}
                alt="profile picture"
                size="xxl"
                variant="rounded"
              />
              <UIBox
                alt="spotify logo"
                position="absolute"
                right={0}
                bottom={0}
                mr={-1}
                mb={-1}>
                <UIButton
                  variant="gradient"
                  color="light"
                  size="small"
                  iconOnly>
                  <Icon>edit</Icon>
                </UIButton>
              </UIBox>
            </UIBox>
          </Grid> */}
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
