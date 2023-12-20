// Soft UI Dashboard PRO React base styles
import borders from "assets/themes/private/base/borders";
import colors from "assets/themes/private/base/colors";

// Soft UI Dashboard PRO React helper functions
import pxToRem from "assets/themes/private/functions/pxToRem";

const { borderWidth } = borders;
const { light } = colors;

const tableCell = {
  styleOverrides: {
    root: {
      padding: `${pxToRem(12)} ${pxToRem(16)}`,
      borderBottom: `${borderWidth[1]} solid ${light.main}`,
    },
  },
};

export default tableCell;
