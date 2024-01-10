/* eslint-disable react/prop-types */
import { DefaultCell } from "../../../../models";

const columns = [
  {
    Header: "Customer",
    accessor: "fullName",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "phone",
    accessor: "phone",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "Order ID",
    accessor: "orderId",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "Feedback",
    accessor: "feedbackContent",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
];
export { columns };
