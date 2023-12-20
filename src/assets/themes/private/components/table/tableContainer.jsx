// Soft UI Dashboard PRO React base styles
import colors from "assets/themes/private/base/colors";
import boxShadows from "assets/themes/private/base/boxShadows";
import borders from "assets/themes/private/base/borders";

const { white } = colors;
const { xxl } = boxShadows;
const { borderRadius } = borders;

const tableContainer = {
  styleOverrides: {
    root: {
      backgroundColor: white.main,
      boxShadow: xxl,
      borderRadius: borderRadius.xl,
    },
  },
};

export default tableContainer;
