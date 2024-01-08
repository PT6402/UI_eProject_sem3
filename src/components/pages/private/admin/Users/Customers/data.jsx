/* eslint-disable react/prop-types */
import { DefaultCell } from "../../../../../models";
import { UIButton } from "../../../../../common";
import { dataApiUser } from "../data";
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
      Header: "email",
      accessor: "email",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ value }) => {
        const handleSubmit = () => {
          const data = { user_id: value };
          console.log(data);
        };
        return (
          <>
            <UIButton color="info">Detail</UIButton>
            <UIButton
              color="error"
              onClick={handleSubmit}
              sx={() => ({ margin: "0 1rem" })}>
              Block
            </UIButton>
          </>
        );
      },
    },
  ],

  rows: dataApiUser.users,
};
const columns = [
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
    Header: "email",
    accessor: "email",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "Action",
    accessor: "id",
    Cell: ({ value }) => {
      const handleSubmit = () => {
        const data = { user_id: value };
        console.log(data);
      };
      return (
        <>
          <UIButton color="info">Detail</UIButton>
          <UIButton
            color="error"
            onClick={handleSubmit}
            sx={() => ({ margin: "0 1rem" })}>
            Block
          </UIButton>
        </>
      );
    },
  },
];
export default data;
export { columns };
