/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { UIButton } from "../../../../common";
import { DefaultCell } from "../../../../models";
import { axiosAuthentication } from "../../../../../../http";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatu } from "../../../../../context/employeeSlice";
import Swal from "sweetalert2";
import {
  setStatus,
  setStatusModal,
  setType,
  setValue,
} from "../../../../../context/modalSlice";

import CreateProduct from "./Create";
import ExportProduct from "./Export";
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
    Header: "number connect",
    accessor: "numb_Connect",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "phone",
    accessor: "phone",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "type connect",
    accessor: "connectType",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "total price",
    accessor: "total_Price",
    Cell: ({ value }) => <DefaultCell value={`${value}$`} />,
  },
  {
    Header: "date",
    accessor: "dateCreate",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "Action",
    accessor: "order_Id",
    id: "id",
    Cell: ({ value }) => {
      const dispatch = useDispatch();
      const [titleButton, setTitleButton] = useState();
      const [statusConfirm, setStatusConfirm] = useState(false);
      const employeeSlice = useSelector((state) => state.employeeSlice);
      const modalType = useSelector((state) => state.modalType);
      const info_user = useSelector((state) => state.user.info_user);
      const handleStopOrder = async () => {
        await axiosAuthentication.put(
          `http://localhost:8000/api/Order/order_stop?OrderId=${value}`
        );
        dispatch(setStatusModal());
        Swal.fire("Success!", "Stop order success!", "success");
      };
      const showSurvey = () => {
        const newSwal = Swal.mixin({
          customClass: {
            confirmButton: "button button-success",
            cancelButton: "button button-error",
          },
          buttonsStyling: false,
        });

        newSwal
          .fire({
            title: "How to survey?",
            // text: "Success click check product",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Success,check product",
            cancelButtonText: "Fail",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              await handleSubmitCheck();
              // Swal.fire("Deleted!", "Your file has been deleted.", "success");
            } else if (result.dismiss == "cancel") {
              handleStopOrder();
            }
          });
      };
      const showSuccess = () =>
        Swal.fire(
          "Product is still in stock!",
          "click to confirm!",
          "success"
        ).then(async (res) => {
          if (res.isConfirmed) {
            await handleSubmit();
          }
        });
      const handleChangeModal = (listDataRecommand) => {
        console.log("test");
        dispatch(setStatus(true));
        dispatch(setType(CreateProduct));
        dispatch(setValue(listDataRecommand));
        console.log(modalType);
      };
      const handleChangeModalExport = () => {
        dispatch(setStatus(true));
        dispatch(setType(ExportProduct));
        dispatch(setValue(value));
      };

      const showError = (message, listDataRecommand) => {
        if (message == "No matching products found.") {
          return Swal.fire(message, "stop order!", "error").then((rest) => {
            if (rest.isConfirmed) {
              handleStopOrder();
            }
          });
        } else {
          return Swal.fire(message, "click to import product!", "error").then(
            (rest) => {
              if (rest.isConfirmed) {
                handleChangeModal(listDataRecommand);
              }
            }
          );
        }
      };

      const handleConfirm = async ({ data }) => {
        const url = `http://localhost:8000/api/Employee/checkStatus?Order_Id=${data}`;
        await axiosAuthentication.get(url).then((res) => {
          if (res.status == 200) {
            setStatusConfirm(true);
            dispatch(setStatu());
            dispatch(setStatusModal());
          }
        });
      };
      const handleSubmit = async () => {
        await handleConfirm({ data: value });
      };
      const handleCheckProduct = async ({ data }) => {
        const url = `http://localhost:8000/api/Employee/checkproduct`;
        await axiosAuthentication
          .post(url, data)
          .then((res) => {
            if (res.status == 200) {
              if (res.data.status) {
                return showSuccess();
              } else {
                return showError(res.data.message, res.data.model);
              }
            }
          })
          .catch(() => showError());
      };
      const handleSubmitCheck = async () => {
        const data = {
          order_Id: value,
          address_Store_Id: info_user.address_store_id, //
        };
        await handleCheckProduct({ data });
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
          {titleButton == "Confirmed" && (
            <UIButton color="info" variant={"outlined"} onClick={showSurvey}>
              Survey
            </UIButton>
          )}
          {titleButton == "Techn Confirmed" && (
            <UIButton color="info" variant={"outlined"}>
              Tech confirmed
            </UIButton>
          )}
          {titleButton == "Paid" && (
            <UIButton color="info" onClick={handleChangeModalExport}>
              Export
            </UIButton>
          )}
          {titleButton == "Payment" && (
            <UIButton color="info" variant={"outlined"}>
              paymenting...
            </UIButton>
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
