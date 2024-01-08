import { UIBox, UIButton } from "../../../../common";
import { DataTable } from "../../../../models";
import { handleRow, columns } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { setStatus, setType } from "../../../../../context/modalSlice";
import CreateCoupon from "./Create";
import { useEffect, useState } from "react";
import { useCoupon } from "../../../../../hooks/useCoupon";
export default function Coupon() {
  const statusModal = useSelector((state) => state.modalType.statusModal);
  const [coupon, setCoupon] = useState(null);
  const { gets, isLoading } = useCoupon();
  const handleCallApi = async () => {
    await gets().then((res) => setCoupon(res));
  };

  useEffect(() => {
    handleCallApi();
  }, [statusModal]);
  const dispatch = useDispatch();
  const handleChangeModal = () => {
    dispatch(setStatus(true));
    dispatch(setType(CreateCoupon));
  };
  return (
    <>
      {!isLoading && coupon != null && (
        <UIBox my={3} sx={() => ({ width: "100%" })}>
          <UIBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={2}>
            <UIButton color="info" onClick={handleChangeModal}>
              + Coupon
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
              table={{ columns, rows: handleRow({ data: coupon }) }}
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
