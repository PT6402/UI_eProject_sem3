import { Loader, UIBox, UIButton } from "../../../../common";
import { DataTable } from "../../../../models";
import { data, columns } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { setStatus, setType } from "../../../../../context/modalSlice";
import CreateSupplier from "./Create";
import { useEffect, useState } from "react";
import { useSupplier } from "../../../../../hooks/useSupplier";
export default function Supplier() {
  const statusModal = useSelector((state) => state.modalType.statusModal);
  const [supplier, setSupplier] = useState(null);
  const { gets, isLoading } = useSupplier();
  const handleCallApi = async () => {
    await gets().then((res) => setSupplier(res));
  };

  useEffect(() => {
    handleCallApi();
  }, [statusModal]);

  const dispatch = useDispatch();
  const handleChangeModal = () => {
    dispatch(setStatus(true));
    dispatch(setType(CreateSupplier));
  };
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && supplier != null && (
        <UIBox my={3} sx={() => ({ width: "100%" })}>
          <UIBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={2}>
            <UIButton color="info" onClick={handleChangeModal}>
              + Supplier
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
              table={{ columns, rows: supplier }}
              entriesPerPage={false}
              showTotalEntries={true}
              isSorted={false}
              canSearch
            />
          </UIBox>
        </UIBox>
      )}
    </>
  );
}
