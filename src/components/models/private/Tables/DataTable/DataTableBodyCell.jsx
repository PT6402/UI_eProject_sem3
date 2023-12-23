import PropTypes from "prop-types";
import { UIBox } from "components/common";
import colors from "assets/themes/private/base/colors";
import typography from "assets/themes/private/base/typography";
import borders from "assets/themes/private/base/borders";

function DataTableBodyCell({ noBorder, align, children }) {
  const { light } = colors;
  const { size } = typography;
  const { borderWidth } = borders;

  return (
    <UIBox
      component="td"
      textAlign={align}
      fontSize={size.sm}
      borderBottom={noBorder ? "none" : `${borderWidth[1]} solid ${light.main}`}
      py={1.5}
      px={3}>
      <UIBox
        display="inline-block"
        width="max-content"
        color="text"
        sx={{
          verticalAlign: "middle",
        }}>
        {children}
      </UIBox>
    </UIBox>
  );
}

DataTableBodyCell.defaultProps = {
  noBorder: false,
  align: "left",
};
DataTableBodyCell.propTypes = {
  children: PropTypes.node.isRequired,
  noBorder: PropTypes.bool,
  align: PropTypes.oneOf(["left", "right", "center"]),
};

export default DataTableBodyCell;
