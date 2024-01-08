import { Card, Divider, Icon, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { listPhoneCode, columns, convertCodeToRegion } from "./data";
import { Loader, UIBox, UIButton, UITypography } from "../../../../common";
import { DataTable } from "../../../../models";
import { Link } from "react-router-dom";
import { useAddressStore } from "../../../../../hooks/useAddressStore";
import { useSelector } from "react-redux";

export default function AddressStores() {
  const statusModal = useSelector((state) => state.modalType.statusModal);
  const { gets, error, isLoading } = useAddressStore();
  const [dataTable, setDataTable] = useState({ columns, rows: null });
  const [menu, setMenu] = useState({ status: null, value: null, id: null });
  const [addressStore, setAddressStore] = useState(null);
  //handle menu
  const openMenu = (event) => {
    setMenu((prev) => ({ ...prev, status: event.currentTarget }));
  };

  const closeMenu = (item) => {
    return setMenu({ status: null, value: item.name, id: item.id });
  };

  //handle call api
  const handleData = async () => {
    await gets().then((res) => {
      setAddressStore(res);
      setDataTable((prev) => ({ ...prev, rows: res }));
    });
  };
  useEffect(() => {
    handleData();
  }, [statusModal]);

  //handle filter region
  const handleFilterRegion = () => {
    if (dataTable.rows != null) {
      if (menu.id == null) {
        setDataTable((prev) => ({ ...prev, rows: addressStore }));
      } else {
        const dataFilter = addressStore.filter(
          ({ region_id }) => region_id == menu.id
        );
        setDataTable((prev) => ({ ...prev, rows: dataFilter }));
      }
    }
  };

  useEffect(() => {
    handleFilterRegion();
  }, [menu.id]);

  const removeFilter = () => {
    setMenu({ status: null, value: null, id: null });
  };

  //handle list filter
  const handleListRegion = () => {
    if (dataTable.rows != null) {
      const listRegion = [];
      listPhoneCode.map((item) => {
        if (
          addressStore.filter(
            ({ phone_code }) => convertCodeToRegion(phone_code).id == item.id
          ).length > 0
        ) {
          return listRegion.push({ name: item.name, id: item.id });
        }
      });
      return listRegion;
    }
    return [];
  };

  const renderMenu = (
    <Menu
      anchorEl={menu.status}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu.status)}
      onClose={() => closeMenu(menu)}>
      {handleListRegion().map((item) => (
        <MenuItem key={item.id} onClick={() => closeMenu(item)}>
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
      {isLoading && <Loader />}
      {!isLoading && dataTable.rows != null && (
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
              <>
                <UIButton
                  variant={menu.status ? "contained" : "outlined"}
                  color="dark"
                  onClick={(e) => openMenu(e)}>
                  {menu.value != null ? menu.value : "Region"}
                  &nbsp;
                  <Icon>keyboard_arrow_down</Icon>
                </UIButton>

                {renderMenu}
              </>
            </UIBox>
          </UIBox>
          {console.log(dataTable)}
          <Card>
            <DataTable table={dataTable} entriesPerPage={true} canSearch />
          </Card>
        </UIBox>
      )}
    </>
  );
}
