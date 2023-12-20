// Soft UI Dashboard PRO React base styles
import typography from "assets/themes/private/base/typography";
import borders from "assets/themes/private/base/borders";
import colors from "assets/themes/private/base/colors";

// Soft UI Dashboard PRO React helper functions
import pxToRem from "assets/themes/private/functions/pxToRem";

const { size } = typography;
const { text } = colors;
const { borderWidth, borderColor } = borders;

const dialogContent = {
  styleOverrides: {
    root: {
      padding: pxToRem(16),
      fontSize: size.md,
      color: text.main,
    },

    dividers: {
      borderTop: `${borderWidth[1]} solid ${borderColor}`,
      borderBottom: `${borderWidth[1]} solid ${borderColor}`,
    },
  },
};

export default dialogContent;
