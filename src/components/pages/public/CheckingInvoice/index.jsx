import FrameUI from "../../../../helpers/FrameUI";

import styles from "./index.module.scss";
import HeaderCheckInvoice from "./HeaderCheckInvoice";
import SearchInvoice from "./SearchInvoice";
import { UIBox } from "../../../common";
import { DataTable } from "../../../models";
import { columns } from "./data";
import { Card } from "@mui/material";
import { axiosAuthentication } from "../../../../../http";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function CheckingInvoice() {
  const info_user = useSelector((state) => state.user.info_user);
  const [dataInvoice, setInvoice] = useState(null);
  const [rows, setRows] = useState(null);
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

  const handleRow = () => {
    if (dataInvoice != null) {
      return dataInvoice.map((item) => {
        let newItem = { ...item };
        newItem.nextPay = formatNgayThangNam(item.nextPay);
        return newItem;
      });
    }
  };
  const handleSubmit = async ({ to, from }) => {
    const data = {
      fromDate: from,
      toDate: to,
      user_Id: info_user.userId,
    };
    // console.log(data);
    const url = "http://localhost:8000/checkinvoice";
    await axiosAuthentication.post(url, data).then((res) => {
      if (res.status == 200) {
        setInvoice(res.data);
      } else {
        setInvoice(null);
      }
    });
  };
  useEffect(() => {
    if (dataInvoice != null) {
      setRows(handleRow());
    }
  }, [dataInvoice]);
  console.log(rows);
  return (
    <FrameUI>
      <section>
        <div className={`${styles.container} main-container`}>
          <div className={styles.welcome_wrapper}>
            <HeaderCheckInvoice />
          </div>
          <SearchInvoice handleSubmit={handleSubmit} />
          {dataInvoice != null && rows != null && (
            <UIBox sx={{ display: "flex", justifyContent: "center" }}>
              <Card
                sx={{
                  marginTop: "4rem",
                  boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  padding: "2rem",
                  width: "90%",
                }}>
                <UIBox mb={3}>
                  <DataTable
                    table={{ columns, rows }}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    isSorted={false}
                    canSearch={false}
                    fontSizeHead={"1.5rem"}
                  />
                </UIBox>
              </Card>
            </UIBox>
          )}
        </div>
      </section>
    </FrameUI>
  );
}
