// Soft UI Dashboard PRO React Button Styles
import root from "assets/themes/private/components/button/root";
import contained from "assets/themes/private/components/button/contained";
import outlined from "assets/themes/private/components/button/outlined";
import buttonText from "assets/themes/private/components/button/text";

const button = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    //root
    root: { ...root },
    //container
    contained: { ...contained.base },
    containedSizeSmall: { ...contained.small },
    containedSizeLarge: { ...contained.large },
    containedPrimary: { ...contained.primary },
    containedSecondary: { ...contained.secondary },
    //outline
    outlined: { ...outlined.base },
    outlinedSizeSmall: { ...outlined.small },
    outlinedSizeLarge: { ...outlined.large },
    outlinedPrimary: { ...outlined.primary },
    outlinedSecondary: { ...outlined.secondary },
    //text
    text: { ...buttonText.base },
    textSizeSmall: { ...buttonText.small },
    textSizeLarge: { ...buttonText.large },
    textPrimary: { ...buttonText.primary },
    textSecondary: { ...buttonText.secondary },
  },
};

export default button;
