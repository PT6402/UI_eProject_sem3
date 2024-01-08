/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { UIBox, UIButton, UIInput, UITypography } from "../../../../common";
import { useDispatch, useSelector } from "react-redux";
import {
  setStatus,
  setStatusModal,
  setType,
  setValue,
} from "../../../../../context/modalSlice";
import Form_Duration from "./Detail";
import { usePackage } from "../../../../../hooks/usePackage";

export default function ItemPackage({
  handleOpen,
  nameValue,
  isOpen,
  idValue,
  packages,
  handleEdit,
  checkIdReload,
  handleDelete,
}) {
  const statusModal = useSelector((state) => state.modalType.statusModal);
  const { gets, isLoading } = usePackage();
  const [packagess, setPackage] = useState(null);
  const handleCallApi = async () => {
    await gets().then((res) => {
      setPackage(res.packages);
    });
  };
  useEffect(() => {
    handleCallApi();
  }, [checkIdReload]);
  useEffect(() => {
    if (packagess != null)
      setName(
        packagess.find(({ package_id }) => package_id == idValue)?.namePackage
      );
  }, [checkIdReload, packagess]);
  const { update } = usePackage();
  const [name, setName] = useState(null);
  const dispatch = useDispatch();
  // const handleEdit = async () => {
  //   const data = {
  //     package_id: idValue,
  //     namePackage: name,
  //   };
  //   await update({ data });
  //   dispatch(setStatusModal());
  // };
  // const handleDelete = async () => {
  //   const data = {
  //     package_id: idValue,
  //   };
  //   console.log(data);
  // };

  const handleChangModal = (package_id) => {
    dispatch(setStatus(true));
    dispatch(setType(Form_Duration));
    dispatch(setValue({ package_id: package_id }));
  };
  const handleCreateDuration = (idValue) => {
    console.log(packages.find(({ id }) => id == idValue));
    if (
      packages.find(({ package_id }) => package_id == idValue).durations
        .length > 0
    ) {
      handleOpen(idValue);
    } else {
      handleChangModal(idValue);
    }
  };
  return (
    <>
      {packagess != null && (
        <UIBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "center", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          px={3}
          py={1}
          sx={() => ({ borderRadius: ".8rem" })}
          bgColor="rgb(232, 233, 235)">
          <UIBox display="flex" alignItems="center" justifyContent="center">
            <UIBox mr={1}>
              <UITypography
                display="block"
                variant="button"
                fontWeight="medium">
                Name:
              </UITypography>
            </UIBox>
            <UIInput onChange={(e) => setName(e.target.value)} value={name} />
            <UIButton
              color="info"
              sx={() => ({ margin: " 0 1rem" })}
              onClick={() =>
                handleEdit({
                  data: {
                    package_id: idValue,
                    namePackage: name,
                  },
                })
              }>
              Edit
            </UIButton>
          </UIBox>
          <UIBox
            display="flex"
            flexDirection={"row"}
            gap={2}
            justifyContent="space-between"
            width={{ xs: "100%", sm: "auto" }}>
            <UIBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
              <UIButton
                variant={
                  isOpen.status && isOpen.value == idValue
                    ? "outlined"
                    : "contained"
                }
                color="info"
                onClick={() => handleCreateDuration(idValue)}>
                {packages.find(({ package_id }) => package_id == idValue)
                  .durations.length > 0
                  ? "duration"
                  : "+ duration"}
              </UIButton>
            </UIBox>
            <UIBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
              <UIButton
                color="error"
                sx={{ height: "100%" }}
                onClick={() => handleDelete({ id: idValue })}>
                Delete
              </UIButton>
            </UIBox>
          </UIBox>
        </UIBox>
      )}
    </>
  );
}
