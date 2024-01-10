import { UIBox, UIButton } from "../../../../../common";
import { Card, Grid } from "@mui/material";
import FormDuration from "./FormDuration";
import { useDispatch, useSelector } from "react-redux";
import { usePackage } from "../../../../../../hooks/usePackage";
import { useEffect, useState } from "react";
import {
  setStatus,
  setStatusModal,
  setType,
  setValue,
} from "../../../../../../context/modalSlice";
import Swal from "sweetalert2";

export default function Form_Duration() {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modalType);
  const { createDuration, gets, updateDuration } = usePackage();
  const [durations, setDuration] = useState(null);
  const [itemDuration, setItemDuration] = useState(null);
  const handleCallApi = async () => {
    if (modalType.value != null) {
      await gets().then((res) => {
        setDuration(res.durations);
      });
    }
  };
  useEffect(() => {
    handleCallApi();
  }, []);
  const handleGetDataItemDuration = () => {
    if (modalType.value != null && durations != null) {
      setItemDuration(durations.find(({ id }) => id == modalType.value));
    }
  };
  useEffect(() => {
    handleGetDataItemDuration();
  }, [durations]);

  let data = {};
  const getData = ({ time, price, note, description }) => {
    if (itemDuration != null) {
      console.log(description);
      data = {
        id: itemDuration.id,
        time: time,
        price: price,
        validate: note,
        description: description == "<p></p>" ? null : description,
        package_id: itemDuration.package_id,
      };
    } else {
      console.log(description);
      data = {
        time: time,
        price: price,
        validate: note,
        description: description,
        package_id: modalType.value?.package_id,
      };
    }
  };
  const showAlert = async ({ message }) =>
    Swal.fire("Success!", `You ${message} duration!`, "success");
  const handleSubmit = async () => {
    if (itemDuration != null) {
      await updateDuration({ data });
      dispatch(setStatusModal());
      dispatch(setStatus(false));
      dispatch(setType(null));
      dispatch(setValue(null));
      showAlert({ message: "update" });
    } else {
      await createDuration({ data });
      dispatch(setStatusModal());
      dispatch(setStatus(false));
      dispatch(setType(null));
      dispatch(setValue(null));
      showAlert({ message: "create" });
    }
  };
  if (modalType.value != null) {
    if (modalType.value.package_id != null) {
      console.log(modalType.value.package_id);
      return (
        <>
          {
            <UIBox mt={1}>
              <Grid container>
                <Grid item xs={12} lg={12}>
                  <Card sx={{ overflow: "visible" }}>
                    <UIBox p={2}>
                      <UIBox>
                        <FormDuration duration={null} getData={getData} />
                        <UIBox
                          mt={3}
                          width="100%"
                          display="flex"
                          justifyContent="flex-end">
                          <UIButton
                            variant="gradient"
                            color="dark"
                            onClick={() => handleSubmit()}>
                            Create
                          </UIButton>
                        </UIBox>
                      </UIBox>
                    </UIBox>
                  </Card>
                </Grid>
              </Grid>
            </UIBox>
          }
        </>
      );
    } else {
      return (
        <>
          {durations != null && itemDuration != null && (
            <UIBox mt={1}>
              <Grid container>
                <Grid item xs={12} lg={12}>
                  <Card sx={{ overflow: "visible" }}>
                    <UIBox p={2}>
                      <UIBox>
                        <FormDuration
                          duration={itemDuration}
                          getData={getData}
                        />
                        <UIBox
                          mt={3}
                          width="100%"
                          display="flex"
                          justifyContent="flex-end">
                          <UIButton
                            variant="gradient"
                            color="dark"
                            onClick={() => handleSubmit()}>
                            Update
                          </UIButton>
                        </UIBox>
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
  }
}
