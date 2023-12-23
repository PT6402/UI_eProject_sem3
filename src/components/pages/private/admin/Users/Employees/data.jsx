/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { DefaultCell } from "../../../../../models";
import { UIButton } from "../../../../../common";

const listTypeRole = [
  { id: 1, label: "Sale", value: "emp_sale" },
  { id: 2, label: "Technical", value: "emp_tech" },
  { id: 3, label: "Account", value: "emp_acc" },
];
const setDefaultRole = (role) => {
  return listTypeRole.filter(({ value }) => value == role)[0];
};
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
      Header: "role",
      accessor: "role",
      Cell: ({ value }) => <DefaultCell value={setDefaultRole(value).label} />,
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ value }) => (
        <Link to={`/admin/users/employees/${value}`}>
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
      role: "emp_acc",
    },
    {
      id: "2",
      fullName: "Trần Thiện Hiếu",
      phone: "0971866177",
      role: "emp_tech",
    },
    {
      id: "3",
      fullName: "Nguyễn Văn Thiện",
      phone: "0971866177",
      role: "emp_sale",
    },
  ],
};

export default data;
export { listTypeRole };
