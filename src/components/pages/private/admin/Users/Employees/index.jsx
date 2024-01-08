import { Card, Divider, Icon, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { dataApiUser, handleTable } from "../data";
import { UIBox, UIButton, UITypography } from "../../../../../common";
import { DataTable } from "../../../../../models";
import { Link } from "react-router-dom";
import { useEmployee } from "../../../../../../hooks/useEmployee";
import { useAddressStore } from "../../../../../../hooks/useAddressStore";
import { axiosAuthentication } from "../../../../../../../http";
import { useSelector } from "react-redux";

export default function Employees() {
  const statusModal = useSelector((state) => state.modalType.statusModal);
  const [dataTable, setDataTable] = useState(null);
  const [employeeType, setEmployeeType] = useState(null);
  const { gets, isLoading } = useEmployee();
  const { gets: getAddressStore } = useAddressStore();
  const [menu, setMenu] = useState({ status: null, value: null, id: null });
  const openMenu = (event) =>
    setMenu((prev) => ({ ...prev, status: event.currentTarget }));
  const closeMenu = (value) => {
    if (value != null) {
      return setMenu({ status: null, value: value, id: value.id });
    } else {
      return setMenu({ status: null, value: null });
    }
  };
  const removeFilter = () => {
    setMenu({ status: null, value: null, id: null });
  };

  const handleCallApi = async ({ id }) => {
    const url = "http://localhost:8000/api/EmployeeType";
    const { data: employee_types } = await axiosAuthentication.get(url);
    setEmployeeType(employee_types);
    const addresses = await getAddressStore();
    console.log(addresses);
    if (id != null) {
      await gets().then((res) =>
        setDataTable(
          handleTable({
            filterRole: id,
            employees: res,
            addresses,
            employee_types,
          })
        )
      );
    } else {
      await gets().then((res) =>
        setDataTable(
          handleTable({
            filterRole: null,
            employees: res,
            addresses,
            employee_types,
          })
        )
      );
    }
  };
  useEffect(() => {
    handleCallApi({ id: menu.id });
  }, [menu.id, statusModal]);
  const renderMenu = (
    <Menu
      anchorEl={menu.status}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu.status)}
      onClose={() => closeMenu(menu.value)}>
      {employeeType != null &&
        employeeType.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => {
              closeMenu(item);
            }}>
            {item.name}
          </MenuItem>
        ))}
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem onClick={removeFilter}>
        <UITypography variant="button" color="error" fontWeight="regular">
          Remove Filter
        </UITypography>
      </MenuItem>
    </Menu>
  );
  return (
    <>
      {!isLoading && dataTable != null && employeeType != null && (
        <UIBox my={3} sx={() => ({ width: "100%" })}>
          <UIBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={2}>
            <Link to={"/admin/users/employees/create"}>
              <UIButton variant="gradient" color="info">
                + Employee
              </UIButton>
            </Link>
            <UIBox display="flex">
              <UIButton
                variant={menu.status ? "contained" : "outlined"}
                color="dark"
                onClick={(e) => openMenu(e)}>
                {menu.value != null ? menu.value.name : "Role"}
                &nbsp;
                <Icon>keyboard_arrow_down</Icon>
              </UIButton>
              {renderMenu}
            </UIBox>
          </UIBox>
          <Card>
            <DataTable table={dataTable} entriesPerPage={true} canSearch />
          </Card>
        </UIBox>
      )}
    </>
  );
}
