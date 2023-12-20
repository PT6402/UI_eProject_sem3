// Soft UI Dashboard PRO React helper functions
import pxToRem from "assets/themes/private/functions/pxToRem";

// Soft UI Dashboard PRO React base styles
import colors from "assets/themes/private/base/colors";
import boxShadows from "assets/themes/private/base/boxShadows";
import borders from "assets/themes/private/base/borders";

const { transparent } = colors;
const { lg } = boxShadows;
const { borderRadius } = borders;

const popover = {
  styleOverrides: {
    paper: {
      backgroundColor: transparent.main,
      boxShadow: lg,
      padding: pxToRem(8),
      borderRadius: borderRadius.lg,
    },
  },
};

export default popover;
