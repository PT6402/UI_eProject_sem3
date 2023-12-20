/* eslint-disable react/prop-types */
import { Icon, Link, MenuItem } from "@mui/material";
import UIBox from "../../private/UIBox";
import UITypography from "../../private/UITypography";
import LayoutDrop from "./LayoutDrop";

export default function Dropdown({ routes, open, close, fontSize }) {
  const renderDocsMenuRoute = (routeName) =>
    routes.map(
      ({ key, collapse }) =>
        key === routeName &&
        collapse.map(({ key: collapseKey, href, name, icon }) => (
          <MenuItem
            key={collapseKey}
            component={Link}
            href={href}
            target="_blank"
            rel="noreferrer"
            onClick={close}>
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
                  {name}
                </UITypography>
              </UIBox>
            </UIBox>
          </MenuItem>
        ))
    );

  return (
    <LayoutDrop open={open} close={close}>
      {renderDocsMenuRoute("docs")}
    </LayoutDrop>
  );
}
