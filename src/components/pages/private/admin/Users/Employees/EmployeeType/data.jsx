/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { DefaultCell } from "../../../../../../models";
import { UIButton } from "../../../../../../common";

const data = {
  columns: [
    {
      Header: "name",
      accessor: "name",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ value }) => (
        <Link to={`/admin/users/employees/types/${value}`}>
          <UIButton color="info" size="small">
            Edit
          </UIButton>
        </Link>
      ),
    },
  ],

  rows: [
    {
      id: 1,
      name: "Technical",
    },
    {
      id: 2,
      name: "Account",
    },
    {
      id: 3,
      name: "Sale",
    },
  ],
};

export default data;
