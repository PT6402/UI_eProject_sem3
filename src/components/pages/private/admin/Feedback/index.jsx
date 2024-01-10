import React, { useEffect, useState } from "react";
import { Loader, UIBox } from "../../../../common";
import { DataTable } from "../../../../models";
import { columns } from "./data";
import { axiosAuthentication } from "../../../../../../http";
export default function FeedBack() {
  const [listFeedback, setFeedback] = useState(null);
  const handleCall = async () => {
    await axiosAuthentication
      .get("http://localhost:8000/api/Order/get-order-by-status-feed")
      .then((res) => {
        if (res.status == 200) {
          setFeedback(res.data);
        }
      });
  };
  useEffect(() => {
    handleCall();
  }, []);
  return (
    <>
      {/* {isLoading && <Loader />} */}
      {listFeedback != null && (
        <UIBox my={3} sx={() => ({ width: "100%" })}>
          <UIBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={2}></UIBox>
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
              table={{ columns, rows: listFeedback }}
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
