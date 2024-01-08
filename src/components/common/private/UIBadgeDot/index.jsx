import { forwardRef } from "react";
import PropTypes from "prop-types";
import UIBox from "components/common/private/UIBox";
import UITypography from "components/common/private/UITypography";

const UIBadgeDot = forwardRef(
  ({ variant, color, size, badgeContent, font, fontSizeCus, ...rest }, ref) => {
    let finalSize;
    let fontSize;
    let padding;

    if (size === "sm") {
      finalSize = "0.5rem";
      fontSize = "caption";
      padding = "0.45em 0.775em";
    } else if (size === "lg") {
      finalSize = "0.625rem";
      fontSize = "body2";
      padding = "0.85em 1.375em";
    } else if (size === "md") {
      finalSize = "0.5rem";
      fontSize = "button";
      padding = "0.65em 1em";
    } else {
      finalSize = "0.375rem";
      fontSize = "caption";
      padding = "0.45em 0.775em";
    }

    const validColors = [
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
    ];

    const validColorIndex = validColors.findIndex((el) => el === color);

    return (
      <UIBox ref={ref} display="flex" alignItems="center" p={padding} {...rest}>
        <UIBox
          component="i"
          display="inline-block"
          width={finalSize}
          height={finalSize}
          borderRadius="50%"
          bgColor={validColors[validColorIndex]}
          variant={variant}
          mr={1}
        />
        <UITypography
          variant={fontSize}
          fontWeight={font.weight ? font.weight : "regular"}
          color={font.color ? font.color : "dark"}
          sx={{ lineHeight: 0, fontSize: fontSizeCus }}>
          {badgeContent}
        </UITypography>
      </UIBox>
    );
  }
);

// Setting default values for the props of SoftBadge
UIBadgeDot.defaultProps = {
  variant: "contained",
  color: "info",
  size: "xs",
  font: {},
};

// Typechecking props of the SoftBadge
UIBadgeDot.propTypes = {
  variant: PropTypes.oneOf(["contained", "gradient"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
  badgeContent: PropTypes.string.isRequired,
  font: PropTypes.shape({
    color: PropTypes.string,
    weight: PropTypes.string,
  }),
};
UIBadgeDot.displayName = "UIBadgeDot";
export default UIBadgeDot;
