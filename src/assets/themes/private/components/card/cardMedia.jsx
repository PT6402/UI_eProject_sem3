// Soft UI Dashboard PRO React Base Styles
import borders from "assets/themes/private/base/borders";

// Soft UI Dashboard PRO React Helper Functions
import pxToRem from "assets/themes/private/functions/pxToRem";

const { borderRadius } = borders;

const cardMedia = {
  styleOverrides: {
    root: {
      borderRadius: borderRadius.xl,
      margin: `${pxToRem(16)} ${pxToRem(16)} 0`,
    },

    media: {
      width: "auto",
    },
  },
};

export default cardMedia;
