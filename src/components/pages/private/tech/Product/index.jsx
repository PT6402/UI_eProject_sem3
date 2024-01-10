import { Loader, UIBox, UIButton } from "../../../../common";
import { DataTable } from "../../../../models";
import { columns, handleRows } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { setStatus, setType } from "../../../../../context/modalSlice";
import CreateProduct from "./Create";
import { useEffect, useState } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
export default function Product() {
  const statusModal = useSelector((state) => state.modalType.statusModal);
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const { gets_AddressStore, isLoading } = useProduct();
  const handleCallApi = async () => {
    await gets_AddressStore().then(async (res) => {
      return await handleRows(res).then((resdata) => setProduct(resdata));
    });
  };

  useEffect(() => {
    handleCallApi();
  }, [statusModal]);

  const handleChangeModal = () => {
    dispatch(setStatus(true));
    dispatch(setType(CreateProduct));
  };

  return (
    <>
      {isLoading && <Loader />}
      {product != null && (
        <UIBox my={3} sx={() => ({ width: "100%" })}>
          <UIBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={2}>
            <UIButton color="info" onClick={handleChangeModal}>
              + Import
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
              table={{ columns, rows: product }}
              entriesPerPage={false}
              showTotalEntries={true}
              isSorted={true}
              canSearch
            />
          </UIBox>
        </UIBox>
      )}
    </>
  );
}
