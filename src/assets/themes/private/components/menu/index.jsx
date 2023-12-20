// Soft UI Dashboard PRO React base styles
import boxShadows from "assets/themes/private/base/boxShadows";
import typography from "assets/themes/private/base/typography";
import colors from "assets/themes/private/base/colors";
import borders from "assets/themes/private/base/borders";

// Soft UI Dashboard PRO React helper functions
import pxToRem from "assets/themes/private/functions/pxToRem";

const { lg } = boxShadows;
const { size } = typography;
const { text, white } = colors;
const { borderRadius } = borders;

const menu = {
  defaultProps: {
    disableAutoFocusItem: true,
  },

  styleOverrides: {
    paper: {
      minWidth: pxToRem(160),
      boxShadow: lg,
      padding: `${pxToRem(16)} ${pxToRem(8)}`,
      fontSize: size.sm,
      color: text.main,
      textAlign: "left",
      backgroundColor: `${white.main} !important`,
      borderRadius: borderRadius.md,
    },
  },
};

export default menu;
