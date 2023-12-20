/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import PropTypes from "prop-types";
import UIBoxRoot from "components/common/private/UIBox/UIBoxRoot";

const UIBox = forwardRef(
  (
    {
      variant,
      bgColor,
      color,
      opacity,
      borderRadius,
      shadow,
      flex_end,
      ...rest
    },
    ref
  ) => {
    return (
      <UIBoxRoot
        {...rest}
        ref={ref}
        ownerState={{
          variant,
          bgColor,
          color,
          opacity,
          borderRadius,
          shadow,
          flex_end,
        }}
      />
    );
  }
);

// Setting default values for the props of SoftBox
UIBox.defaultProps = {
  variant: "contained",
  bgColor: "transparent",
  color: "dark",
  opacity: 1,
  borderRadius: "none",
  shadow: "none",
};

// Typechecking props for the UIBox
UIBox.propTypes = {
  variant: PropTypes.oneOf(["contained", "gradient"]),
  bgColor: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
  borderRadius: PropTypes.string,
  shadow: PropTypes.string,
};
UIBox.displayName = "UIBox";
export default UIBox;
