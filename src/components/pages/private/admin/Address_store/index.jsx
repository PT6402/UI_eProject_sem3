import { Card, Icon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import data, { listPhoneCode } from "./data";
import { UIBox, UIButton } from "../../../../common";
import { DataTable } from "../../../../models";
import { Link } from "react-router-dom";

export default function AddressStores() {
  const [menu, setMenu] = useState({ status: null, value: null });
  const openMenu = (event) => setMenu({ status: event.currentTarget });
  const closeMenu = (value) => {
    if (value != null) {
      return setMenu({ status: null, value: value });
    } else {
      return setMenu({ status: null, value: null });
    }
  };
  const renderMenu = (
    <Menu
      anchorEl={menu.status}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu.status)}
      onClose={() => closeMenu(menu.value)}>
      {listPhoneCode.map((item) => (
        <MenuItem key={item.id} onClick={() => closeMenu(item)}>
          {item.name}
        </MenuItem>
      ))}
    </Menu>
  );
  return (
    <UIBox my={3} sx={() => ({ width: "100%" })}>
      <UIBox
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={2}>
        <Link to={"/admin/address-stores/create"}>
          <UIButton variant="gradient" color="info">
            new Address store
          </UIButton>
        </Link>
        <UIBox display="flex">
          <UIButton
            variant={menu.status ? "contained" : "outlined"}
            color="dark"
            onClick={(e) => openMenu(e)}>
            {menu.value != null ? menu.value.name : "Region"}
            &nbsp;
            <Icon>keyboard_arrow_down</Icon>
          </UIButton>
          {renderMenu}
        </UIBox>
      </UIBox>
      <Card>
        <DataTable table={data} entriesPerPage={true} canSearch />
      </Card>
    </UIBox>
  );
}
