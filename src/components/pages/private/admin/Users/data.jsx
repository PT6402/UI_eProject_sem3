/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { DefaultCell } from "../../../../models";
import { UIButton } from "../../../../common";
import { dataApiAddress } from "../Address_store/data";
import { useDispatch } from "react-redux";
import { useEmployee } from "../../../../../hooks/useEmployee";
import { setStatusModal } from "../../../../../context/modalSlice";

const setDefaultRole = ({ idType, employee_types }) => {
  return employee_types.find(({ id }) => id == idType);
};
const handleTable = ({ filterRole, employees, addresses, employee_types }) => {
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
      Header: "role",
      accessor: "role",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "address store",
      accessor: "address_store",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },

    {
      Header: "Action",
      accessor: "id",
      Cell: ({ value }) => {
        const dispatch = useDispatch();
        const { handleDelete } = useEmployee();
        const handleDel = async () => {
          await handleDelete({ id: value });
          dispatch(setStatusModal());
        };

        return (
          <>
            <Link to={`/admin/users/employees/edit/${value}`}>
              <UIButton color="info">Edit</UIButton>
            </Link>
            <UIButton
              color="error"
              onClick={handleDel}
              sx={() => ({ margin: "0 1rem" })}>
              Delete
            </UIButton>
          </>
        );
      },
    },
  ];
  let rows = [];
  if (filterRole != null) {
    console.log("terst");
    rows = employees
      .filter(({ employee_type_id }) => employee_type_id == filterRole)
      .map((item) => {
        const newItem = { ...item };
        newItem.role = setDefaultRole({
          idType: item.employee_type_id,
          employee_types,
        }).name;
        newItem.address_store = addresses.find(
          ({ id }) => id == item.address_store_id
        ).address_full;
        return newItem;
      });
  } else {
    rows = employees.map((item) => {
      const newItem = { ...item };
      newItem.role = setDefaultRole({
        idType: item.employee_type_id,
        employee_types,
      }).name;
      newItem.address_store = addresses.find(
        ({ id }) => id == item.address_store_id
      ).address_full;
      return newItem;
    });
  }

  return { columns, rows };
};

const dataApiUser = {
  users: [
    {
      id: 1,
      fullName: "Trần Văn Phát",
      phone: "0971866177",
      email: "user@gmail.com",
    },
    {
      id: "2",
      fullName: "Trần Thiện Hiếu",
      phone: "0971866177",
      email: "user@gmail.com",
    },
    {
      id: "3",
      fullName: "Nguyễn Văn Thiện",
      phone: "0971866177",
      email: "user@gmail.com",
    },
  ],
  employee_types: [
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
  employees: [
    {
      id: 1,
      fullName: "Trần Văn Phát",
      phone: "0971866177",
      email: "user@email.com",
      employee_type_id: 1,
      address_store_id: 2,
    },
    {
      id: "2",
      fullName: "Trần Thiện Hiếu",
      email: "user@email.com",
      phone: "0971866177",
      employee_type_id: 2,
      address_store_id: 1,
    },
    {
      id: "3",
      fullName: "Nguyễn Văn Thiện",
      email: "user@email.com",
      phone: "0971866177",
      employee_type_id: 3,
      address_store_id: 3,
    },
  ],
};

export { dataApiUser, handleTable, setDefaultRole };
