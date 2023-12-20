// Soft UI Dashboard PRO React base styles
import typography from "assets/themes/private/base/typography";
import colors from "assets/themes/private/base/colors";

// Soft UI Dashboard PRO React helper functions
// import pxToRem from "assets/themes/private/functions/pxToRem";

const { size } = typography;
const { text } = colors;

const dialogContentText = {
  styleOverrides: {
    root: {
      fontSize: size.md,
      color: text.main,
    },
  },
};

export default dialogContentText;
