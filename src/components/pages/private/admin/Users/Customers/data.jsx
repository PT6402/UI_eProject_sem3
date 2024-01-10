/* eslint-disable react/prop-types */
import { DefaultCell } from "../../../../../models";
import { UIButton } from "../../../../../common";
import { dataApiUser } from "../data";
import Swal from "sweetalert2";
import { axiosAuthentication } from "../../../../../../../http";
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
    Cell: ({ value }) => (
      <DefaultCell value={value == null ? "no email" : value} />
    ),
  },
  {
    Header: "Action",
    accessor: "id",
    Cell: ({ value }) => {
      const showAlert = async () => {
        const newSwal = Swal.mixin({
          customClass: {
            confirmButton: "button button-success",
            cancelButton: "button button-error",
          },
          buttonsStyling: false,
        });

        return newSwal
          .fire({
            title: "Are you sure?",
            text: "You want block customer!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, block!",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              // const data = { user_id: value };
              await axiosAuthentication
                .put(
                  `http://localhost:8000/api/User/user_block?userId=${value}`
                )
                .then((res) => {
                  if (res.status == 200) {
                    Swal.fire("Block!", "Your has been block.", "success");
                  }
                });
            }
          });
      };
      const handleSubmit = async () => {
        await showAlert();
      };

      return (
        <>
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
