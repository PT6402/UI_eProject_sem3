// Soft UI Dashboard PRO React Base Styles
import colors from "assets/themes/private/base/colors";
import borders from "assets/themes/private/base/borders";
import boxShadows from "assets/themes/private/base/boxShadows";

// Soft UI Dashboard PRO React Helper Function
import rgba from "assets/themes/private/functions/rgba";

const { black, white } = colors;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;

const card = {
  styleOverrides: {
    root: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      minWidth: 0,
      wordWrap: "break-word",
      backgroundColor: white.main,
      backgroundClip: "border-box",
      border: `${borderWidth[0]} solid ${rgba(black.main, 0.125)}`,
      borderRadius: borderRadius.xl,
      boxShadow: xxl,
    },
  },
};

export default card;
