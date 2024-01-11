import { useEffect, useState } from "react";
import { UIBox, UIButton } from "../../../../common";
import { DataTable } from "../../../../models";
import { columns } from "./data";
import { axiosAuthentication } from "../../../../../../http";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "../../../../../context/employeeSlice";
import Swal from "sweetalert2";
export default function CheckOrder() {
  const info_user = useSelector((state) => state.user.info_user);
  const modalType = useSelector((state) => state.modalType);
  const [orderList, setOrderList] = useState(null);
  const employeeSlice = useSelector((state) => state.employeeSlice);
  const dispatch = useDispatch();
  function formatNgayThangNam(chuoiNgay) {
    let ngayGoc = new Date(chuoiNgay);
    let ngay = ngayGoc.getDate();
    let thang = ngayGoc.getMonth() + 1;
    let nam = ngayGoc.getFullYear();
    let ngayMoiFormat =
      ngay.toString().padStart(2, "0") +
      "/" +
      thang.toString().padStart(2, "0") +
      "/" +
      nam.toString();
    return ngayMoiFormat;
  }

  const handleCallList = async () => {
    const url = `http://localhost:8000/api/Staff?storeID=${info_user.address_store_id}&empID=${info_user.employee_id}`;
    await axiosAuthentication.get(url).then(async (res) => {
      if (res.status == 200) {
        const reqdata = res.data.model;
        reqdata.map((item) => {
          item.dateCreate = formatNgayThangNam(item.dateCreate);
          return item;
        });
        setOrderList(res.data.model);
        dispatch(setValue(res.data.model));
      }
    });
  };
  const [reload, setReload] = useState(false);
  useEffect(() => {
    handleCallList();
  }, [
    employeeSlice.statusOrder,
    modalType.value,
    modalType.statusModal,
    reload,
  ]);
  return (
    <>
      {orderList != null && (
        <UIBox my={3} sx={() => ({ width: "100%" })}>
          <UIBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={2}>
            <UIBox display="flex">
              <UIBox ml={1}>
                <UIButton
                  color={"info"}
                  onClick={() => setReload((prev) => !prev)}>
                  Reload
                </UIButton>
              </UIBox>
            </UIBox>
          </UIBox>
          <UIBox mb={3}>
            <DataTable
              table={{ columns, rows: orderList }}
              entriesPerPage={true}
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
