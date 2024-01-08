/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import { UIBox } from "../../../../common";
import colors from "assets/themes/private/base/colors";
import borders from "assets/themes/private/base/borders";

function DataTableHeadCell({
  width,
  children,
  sorted,
  align,
  fontSize,
  ...rest
}) {
  const { light } = colors;
  const { borderWidth } = borders;

  return (
    <UIBox
      component="th"
      width={width}
      borderBottom={`${borderWidth[1]} solid ${light.main}`}
      py={1.5}
      px={3}>
      <UIBox
        {...rest}
        position="relative"
        textAlign={align}
        color="secondary"
        opacity={0.7}
        sx={({ typography: { size, fontWeightBold } }) => ({
          fontSize: fontSize ? "fontSize" : size.xxs,
          fontWeight: fontWeightBold,
          textTransform: "uppercase",
          cursor: sorted && "pointer",
          userSelect: sorted && "none",
        })}>
        {children}
        {sorted && (
          <UIBox
            position="absolute"
            top={0}
            right={align !== "right" ? "16px" : 0}
            left={align === "right" ? "-5px" : "unset"}
            sx={({ typography: { size } }) => ({
              fontSize: size.lg,
            })}>
            <UIBox
              position="absolute"
              top={-6}
              color={sorted === "asce" ? "text" : "secondary"}
              opacity={sorted === "asce" ? 1 : 0.5}>
              <Icon>arrow_drop_up</Icon>
            </UIBox>
            <UIBox
              position="absolute"
              top={0}
              color={sorted === "desc" ? "text" : "secondary"}
              opacity={sorted === "desc" ? 1 : 0.5}>
              <Icon>arrow_drop_down</Icon>
            </UIBox>
          </UIBox>
        )}
      </UIBox>
    </UIBox>
  );
}

DataTableHeadCell.defaultProps = {
  width: "auto",
  sorted: "none",
  align: "left",
};

DataTableHeadCell.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
  sorted: PropTypes.oneOf([false, "none", "asce", "desc"]),
  align: PropTypes.oneOf(["left", "right", "center"]),
};

export default DataTableHeadCell;
