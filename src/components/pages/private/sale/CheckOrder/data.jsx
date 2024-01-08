/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { UIButton } from "../../../../common";
import { DefaultCell } from "../../../../models";
import { axiosAuthentication } from "../../../../../../http";
import { useState } from "react";

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
      const [statusConfirm, setStatusConfirm] = useState(false);
      const handleConfirm = async ({ data }) => {
        const url = "";
        await axiosAuthentication.post(url, data).then((res) => {
          if (res.status == 200) {
            setStatusConfirm(true);
          }
        });
      };
      const handleSubmit = async () => {
        await handleConfirm({ data: value });
      };
      return (
        <>
          {/* <Link to={"/employee_sale/1"}>
            <UIButton
              variant={"outlined"}
              color="info"
              // onClick={handleChangeModal}
              sx={() => ({ margin: "0 1rem" })}>
              Detail
            </UIButton>
          </Link> */}
          <UIButton color="info" onClick={handleSubmit}>
            {!statusConfirm ? "Confirm" : "Confirmed"}
          </UIButton>
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
