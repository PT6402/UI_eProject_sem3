/* eslint-disable react/prop-types */
import { MenuItem } from "@mui/material";
import UIBox from "../../private/UIBox";
import UITypography from "../../private/UITypography";
import LayoutDrop from "./LayoutDrop";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import { useConnect } from "../../../../hooks/useConnect";
import {
  setPage,
  setStatusPage,
  setValue,
} from "../../../../context/pageSlice";
import PageService from "../../../pages/public/PageServices";

export default function Dropdown({ open, close, fontSize }) {
  const { pathname } = useLocation();
  const { gets } = useConnect();
  const [connects, setConnects] = useState(null);
  const dispatch = useDispatch();
  const handleGetConnect = async () => {
    await gets().then((res) =>
      setConnects(() => {
        return res.map((item) => {
          return { name: item.name, id: item.id };
        });
      })
    );
  };
  useEffect(() => {
    handleGetConnect();
  }, [pathname]);
  const handleSelectPage = (id) => {
    dispatch(setStatusPage(true));
    dispatch(setPage(PageService));
    dispatch(setValue(id));
  };
  const renderDocsMenuRoute = () =>
    connects.map(({ id, name }) => {
      return (
        <MenuItem key={id} component={"div"} onClick={close}>
          <Link to={`/page-services/${id}`}>
            <UIBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              onClick={() => handleSelectPage(id)}>
              <UIBox
                pl={2}
                lineHeight={0}
                sx={() => ({ fontSize: `${fontSize}px` })}>
                <UITypography
                  variant="h6"
                  fontWeight="bold"
                  sx={() => ({ fontSize: `${fontSize - 2}px` })}>
                  {name}
                </UITypography>
              </UIBox>
            </UIBox>
          </Link>
        </MenuItem>
      );
    });

  return (
    <>
      {connects != null && (
        <LayoutDrop open={open} close={close}>
          {renderDocsMenuRoute()}
        </LayoutDrop>
      )}
    </>
  );
}
