/* eslint-disable react/prop-types */
import UIBox from "../../private/UIBox";
import UITypography from "../../private/UITypography";
import { Collapse, Icon } from "@mui/material";

export default function UIDrop({
  name,
  openHandler,
  closeHandler,
  children,
  collapseStatus,
  light,
  fontSize,
  ...rest
}) {
  return (
    <>
      <UIBox
        {...rest}
        onMouseEnter={children ? undefined : openHandler}
        onMouseLeave={children ? undefined : closeHandler}
        display="flex"
        mt={1}
        color={light ? "white" : "dark"}
        justifyContent="center"
        alignItems="flex-end"
        sx={{ cursor: "pointer", userSelect: "none" }}>
        <UITypography
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          color="dark"
          sx={{
            fontWeight: "900",
            fontSize: `${fontSize}px`,
            width: "100%",
            whiteSpace: "nowrap",
            marginRight: ".5rem",
          }}>
          {name}
        </UITypography>
        <UITypography
          variant="body2"
          color={"dark"}
          sx={{
            fontWeight: "900",
            fontSize: `${fontSize}px`,
            width: "100%",
            whiteSpace: "nowrap",
            marginRight: ".5rem",
          }}>
          <Icon
            sx={{
              fontWeight: "bold",
              verticalAlign: "middle",
              fontSize: `${fontSize}px`,
            }}>
            keyboard_arrow_down
          </Icon>
        </UITypography>
      </UIBox>
      {children && (
        <Collapse in={Boolean(collapseStatus)} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}
