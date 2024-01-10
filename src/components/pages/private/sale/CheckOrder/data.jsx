/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { UIButton } from "../../../../common";
import { DefaultCell } from "../../../../models";
import { axiosAuthentication } from "../../../../../../http";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatu } from "../../../../../context/employeeSlice";

const columns = [
  {
    Header: "ID Order",
    accessor: "order_Id",
    id: "idorder",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "customer",
    accessor: "fullName",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "phone",
    accessor: "phone",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  // {
  //   Header: "type connect",
  //   accessor: "connectType",
  //   Cell: ({ value }) => <DefaultCell value={value} />,
  // },
  // {
  //   Header: "total price",
  //   accessor: "total_Price",
  //   Cell: ({ value }) => <DefaultCell value={`${value}$`} />,
  // },
  // {
  //   Header: "date",
  //   accessor: "dateCreate",
  //   Cell: ({ value }) => <DefaultCell value={value} />,
  // },
  {
    Header: "Action",
    accessor: "order_Id",
    id: "id",
    Cell: ({ value }) => {
      const dispatch = useDispatch();
      const [titleButton, setTitleButton] = useState();
      const [statusConfirm, setStatusConfirm] = useState(false);
      const employeeSlice = useSelector((state) => state.employeeSlice);
      const handleConfirm = async ({ data }) => {
        const url = `http://localhost:8000/api/Employee/checkStaffStatus?Order_Id=${data}`;
        await axiosAuthentication.get(url).then((res) => {
          if (res.status == 200) {
            setStatusConfirm((prev) => !prev);
            dispatch(setStatu());
          }
        });
      };
      const handleSubmit = async () => {
        await handleConfirm({ data: value });
      };
      const handleStatusUserPayment = async ({ data }) => {
        const url = `http://localhost:8000/api/Employee/checkStaffStatusPayment?Order_Id=${data}`;
        await axiosAuthentication.get(url).then((res) => {
          if (res.status == 200) {
            setStatusConfirm((prev) => !prev);
            dispatch(setStatu());
          }
        });
      };
      const handleUserPayment = async () => {
        await handleStatusUserPayment({ data: value });
      };
      const handleTitleButton = () => {
        if (employeeSlice.list != null) {
          employeeSlice.list.map((item) => {
            if (item.order_Id == value) {
              setTitleButton(item.status);
            }
          });
        }
      };
      useEffect(() => {
        handleTitleButton();
      }, [statusConfirm, employeeSlice]);
      return (
        <>
          {titleButton == "Processing" && (
            <UIButton color="info" onClick={handleSubmit}>
              Confirm
            </UIButton>
          )}
          {titleButton == "Confirmed" && (
            <>
              <UIButton
                color="info"
                variant={"outlined"}
                sx={{ margin: "0 1rem" }}>
                Tech Confirming...
              </UIButton>
            </>
          )}
          {titleButton == "Techn Confirmed" && (
            <>
              <UIButton color="info" onClick={handleUserPayment}>
                User Payment
              </UIButton>
            </>
          )}
          {titleButton == "Payment" && (
            <>
              <UIButton color="info" variant={"outlined"}>
                Paymenting...
              </UIButton>
            </>
          )}
          {titleButton == "Paid" && (
            <>
              <UIButton color="success" variant={"outlined"}>
                Payment Success
              </UIButton>
            </>
          )}
          {titleButton == "Finish" && (
            <>
              <UIButton color="success" variant={"outlined"}>
                Finish
              </UIButton>
            </>
          )}
          {titleButton == "StopOrder" && (
            <>
              <UIButton color="error" variant={"outlined"}>
                Stop ordered
              </UIButton>
            </>
          )}
        </>
      );
    },
  },
];

const rows = [
  {
    id_order: "D12345678901",
    customer: "phat",
    phone: "0971866177",
    connect_type: "dialup",
    total_price: "123",
    date_create: "12/12/2012",
  },
];
export { columns, rows };
