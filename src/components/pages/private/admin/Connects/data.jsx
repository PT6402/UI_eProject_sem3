/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { DefaultCell } from "../../../../models";
import { UIButton } from "../../../../common";
const data = {
  columns: [
    {
      Header: "Name",
      accessor: "name",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "deposit",
      accessor: "deposit",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ value }) => (
        <Link to={`/admin/connects/${value}`}>
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
      name: "Dial up",
      deposit: 15.6,
      status: true,
      description: "<p><strong>hello 1</strong></p>",
    },
    {
      id: 2,
      name: "Broadband",
      deposit: 30.6,
      status: true,
      description: "<p><strong>hello 2</strong></p>",
    },
    {
      id: 3,
      name: "Landline",
      deposit: 50.6,
      status: false,
      description: "<p><strong>hello 3</strong></p>",
    },
  ],
};

export default data;
