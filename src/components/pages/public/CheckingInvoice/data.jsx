/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { setStatus, setType, setValue } from "../../../../context/modalSlice";
import { DefaultCell } from "../../../models";
import { UIButton } from "../../../common";
import { BsDownload } from "react-icons/bs";
import { BiShow } from "react-icons/bi";
const fontSize = "1.8rem";
const columns = [
  {
    Header: "Contract Service",
    accessor: "contract_Service_Id",
    Cell: ({ value }) => <DefaultCell value={value} fontSize={fontSize} />,
  },
  {
    Header: "Total Amount",
    accessor: "last_payment_value",
    Cell: ({ value }) => (
      <DefaultCell value={`${value} $`} fontSize={fontSize} />
    ),
  },
  {
    Header: "Next pay",
    accessor: "nextPay",
    Cell: ({ value }) => <DefaultCell value={value} fontSize={fontSize} />,
  },
];
const rows = [
  {
    id: 1,
    no: 1,
    status: "good",
    customer_name: "alex",
    no_invoice: "D0000000001",
    total_amount: 123,
    date_created: "12/12/2024",
  },
  {
    id: 2,
    no: 2,
    status: "good",
    customer_name: "alex",
    no_invoice: "B0000000001",
    total_amount: 1000,
    date_created: "12/12/2024",
  },
];
export { columns, rows };
