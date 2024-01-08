/* eslint-disable react/prop-types */
import { Icon, MenuItem } from "@mui/material";
import UIBox from "../../private/UIBox";
import UITypography from "../../private/UITypography";
import LayoutDrop from "./LayoutDrop";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setStatus, setType } from "../../../../context/modalSlice";
import SignIn from "../../../pages/public/Sign_in";

export default function Dropdown({ routes, open, close, fontSize }) {
  const info_user = useSelector((state) => state.user.info_user);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const handleChangeModal = () => {
    dispatch(setStatus(true));
    dispatch(setType(SignIn));
  };
  const renderDocsMenuRoute = (routeName) =>
    routes.map(
      ({ key, collapse }) =>
        key === routeName &&
        collapse.map(({ key: collapseKey, href, name, icon }) => (
          <MenuItem
            key={collapseKey}
            component={"div"}
            to={href}
            onClick={close}>
            <Link
              to={
                href == "/checking-invoice"
                  ? info_user.isVerified
                    ? href
                    : pathname
                  : href
              }
              onClick={
                href == "/checking-invoice" && !info_user.isVerified
                  ? handleChangeModal
                  : null
              }>
              <UIBox display="flex" justifyContent="center" alignItems="center">
                {typeof icon === "string" ? (
                  <Icon sx={() => ({ fontSize: `${fontSize}px` })}>{icon}</Icon>
                ) : (
                  <UIBox mt={0.5} sx={() => ({ fontSize: `${fontSize}px` })}>
                    {icon}
                  </UIBox>
                )}
                <UIBox
                  pl={2}
                  lineHeight={0}
                  sx={() => ({ fontSize: `${fontSize}px` })}>
                  <UITypography
                    variant="h6"
                    fontWeight="bold"
                    sx={() => ({ fontSize: `${fontSize - 2}px` })}>
                    {href == "/checking-invoice" ? (
                      info_user.isVerified ? (
                        name
                      ) : (
                        <span style={{ opacity: 0.5 }}>{name}</span>
                      )
                    ) : (
                      name
                    )}
                  </UITypography>
                </UIBox>
              </UIBox>
            </Link>
          </MenuItem>
        ))
    );

  return (
    <LayoutDrop open={open} close={close}>
      {renderDocsMenuRoute("docs")}
    </LayoutDrop>
  );
}
