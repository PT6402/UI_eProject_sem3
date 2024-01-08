import { useEffect, useState } from "react";
import {
  UIBox,
  UIButton,
  UIInput,
  UISelect,
  UITypography,
} from "../../../../common";
import { useDispatch, useSelector } from "react-redux";
import { useConnect } from "../../../../../hooks/useConnect";
import { usePackage } from "../../../../../hooks/usePackage";
import {
  setStatus,
  setStatusModal,
  setType,
  setValue,
} from "../../../../../context/modalSlice";
import { setCurrentConnect } from "../../../../../context/packageSlice";

export default function CreatePackage() {
  const modalType = useSelector((state) => state.modalType);
  const { gets: connect_types } = useConnect();
  const { create } = usePackage();
  const dispatch = useDispatch();
  const [connect_typess, setConnect_Type] = useState(null);
  const handleCallApi = async () => {
    await connect_types().then((res) => setConnect_Type(res));
  };
  useEffect(() => {
    handleCallApi();
  }, []);
  const [name, setName] = useState("");
  const [connectType, setConnectType] = useState(null);
  const [list_connect_types, setList_Connect_Type] = useState();
  const handleDataForm = () => {
    if (connect_typess != null) {
      const connect_type = connect_typess.find(
        ({ id }) => id == modalType.value
      );

      setConnectType({
        value: connect_type.id,
        label: connect_type.name,
      });
      setList_Connect_Type(
        connect_typess.map((item) => ({
          value: item.id,
          label: item.name,
        }))
      );
    }
  };

  useEffect(() => {
    handleDataForm();
  }, [connect_typess]);

  const handleSubmit = async () => {
    const data = {
      namePackage: name,
      connect_type_id: connectType.value,
    };
    await create({ data });
    dispatch(setStatusModal());
    dispatch(setStatus(false));
    dispatch(setType(null));
    dispatch(setValue(null));
    dispatch(setCurrentConnect(connectType.value - 1));
  };
  return (
    <>
      {connectType != null && (
        <UIBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "center", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          px={3}
          py={1}
          sx={() => ({ borderRadius: "1rem" })}
          bgColor="rgb(232, 233, 235)">
          <UIBox
            display="flex"
            alignItems="center"
            justifyContent="space-between">
            <UIBox mr={1}>
              <UITypography
                display="block"
                variant="button"
                fontWeight="medium">
                Name:
              </UITypography>
            </UIBox>
            <UIInput
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="enter name package"
            />
          </UIBox>
          <UIBox
            display="flex"
            alignItems="center"
            justifyContent="space-between">
            <UIBox ml={1}>
              <UITypography
                display="block"
                variant="button"
                fontWeight="medium">
                Connect Type:
              </UITypography>
            </UIBox>
            <UISelect
              options={list_connect_types}
              placeholder={"Select Connect type"}
              onChange={(choice) => setConnectType(choice)}
              defaultValue={{
                value: connectType.value,
                label: connectType.label,
              }}
            />
          </UIBox>
          <UIButton
            color="info"
            sx={() => ({ margin: " 0 1rem" })}
            onClick={handleSubmit}>
            Create
          </UIButton>
        </UIBox>
      )}
    </>
  );
}
