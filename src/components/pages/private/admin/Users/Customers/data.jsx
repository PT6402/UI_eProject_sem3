/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { DefaultCell } from "../../../../../models";
import { UIButton } from "../../../../../common";
const data = {
  columns: [
    {
      Header: "fullname",
      accessor: "fullName",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "phone",
      accessor: "phone",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ value }) => (
        <Link to={`/admin/users/customers/${value}`}>
          <UIButton color="info" size="small">
            Edit
          </UIButton>
        </Link>
      ),
    },
  ],

  rows: [
    {
      id: "1",
      fullName: "Trần Văn Phát",
      phone: "0971866177",
    },
    {
      id: "2",
      fullName: "Trần Thiện Hiếu",
      phone: "0971866177",
    },
    {
      id: "3",
      fullName: "Nguyễn Văn Thiện",
      phone: "0971866177",
    },
  ],
};

export default data;
