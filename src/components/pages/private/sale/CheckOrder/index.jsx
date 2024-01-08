import React, { useEffect, useState } from "react";
import { UIBox, UIButton } from "../../../../common";
import { DataTable } from "../../../../models";
import { columns, rows } from "./data";
import { axiosAuthentication } from "../../../../../../http";
export default function CheckOrder() {
  const [orderList, setOrderList] = useState({});
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
    const url = `http://localhost:8000/api/Staff?storeID=${1}&empID=${1}`;
    await axiosAuthentication.get(url).then((res) => {
      if (res.status == 200) {
        const reqdata = res.data.model;
        reqdata.map((item) => {
          item.dateCreate = formatNgayThangNam(item.dateCreate);
          return item;
        });
        setOrderList(res.data.model);
      }
    });
  };
  useEffect(() => {
    handleCallList();
  }, []);
  console.log(orderList);
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
              <UIBox ml={1}></UIBox>
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
