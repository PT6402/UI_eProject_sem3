import { UIBox } from "../../../../../common";
import { Card, Grid } from "@mui/material";
import FormDuration from "./FormCallCharge";
import { useSelector } from "react-redux";
import { dataApi } from "../data";
import { useEffect, useState } from "react";
import { usePackage } from "../../../../../../hooks/usePackage";

export default function Form_CallCharge() {
  const statusModal = useSelector((state) => state.modalType.statusModal);
  const [duration, setDuration] = useState(null);
  const { gets, isLoading } = usePackage();
  const handleCallApi = async () => {
    await gets().then((res) => {
      setDuration(res.durations);
    });
  };
  useEffect(() => {
    handleCallApi();
  }, [statusModal]);
  const modalType = useSelector((state) => state.modalType);
  let itemDuration = null;
  if (modalType.value != null && duration != null) {
    itemDuration = duration.find(({ id }) => id == modalType.value);
  }
  return (
    <>
      {!isLoading && duration != null && (
        <UIBox mt={1} sx={() => ({ width: "100%" })}>
          <Grid container>
            <Grid item xs={12} lg={12}>
              <Card sx={{ overflow: "visible" }}>
                <UIBox p={2}>
                  <UIBox>
                    <FormDuration duration={itemDuration} />
                  </UIBox>
                </UIBox>
              </Card>
            </Grid>
          </Grid>
        </UIBox>
      )}
    </>
  );
}
