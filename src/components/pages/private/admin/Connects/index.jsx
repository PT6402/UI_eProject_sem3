import { UIBox, UIButton } from "../../../../common";
import { DataTable } from "../../../../models";
import { columns } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { setStatus, setType } from "../../../../../context/modalSlice";
import CreateConnect from "./Create";

import { useEffect, useState } from "react";
import { useConnect } from "../../../../../hooks/useConnect";
export default function Connects() {
  const modalType = useSelector((state) => state.modalType);
  const { gets, isLoading } = useConnect();
  const [connect, setConnect] = useState(null);
  const dispatch = useDispatch();
  const handleChangeModal = () => {
    dispatch(setStatus(true));
    dispatch(setType(CreateConnect));
  };
  const handelCallApi = async () => {
    gets().then((res) => setConnect(res));
  };
  useEffect(() => {
    handelCallApi();
  }, [modalType.statusModal]);
  return (
    <>
      {!isLoading && connect != null && (
        <UIBox my={3} sx={() => ({ width: "100%" })}>
          <UIBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={2}>
            <UIButton color="info" onClick={handleChangeModal}>
              + Connect type
            </UIButton>
          </UIBox>
          <UIBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={2}>
            <UIBox display="flex">
              <UIBox ml={1}></UIBox>
            </UIBox>
          </UIBox>
          <UIBox mb={3}>
            <DataTable
              table={{ columns, rows: connect }}
              entriesPerPage={false}
              showTotalEntries={false}
              isSorted={false}
            />
          </UIBox>
        </UIBox>
      )}
    </>
  );
}
