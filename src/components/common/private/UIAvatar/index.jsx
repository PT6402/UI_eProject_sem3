import { forwardRef } from "react";
import PropTypes from "prop-types";
import UIAvatarRoot from "components/common/private/UIAvatar/UIAvatarRoot";

const UIAvatar = forwardRef(({ bgColor, size, shadow, ...rest }, ref) => (
  <UIAvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} {...rest} />
));

// Setting default values for the props of SoftAvatar
UIAvatar.defaultProps = {
  bgColor: "transparent",
  size: "md",
  shadow: "none",
};

// Typechecking props for the SoftAvatar
UIAvatar.propTypes = {
  bgColor: PropTypes.oneOf([
    "transparent",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"]),
  shadow: PropTypes.oneOf([
    "none",
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "xxl",
    "inset",
  ]),
};
UIAvatar.displayName = "UIAvatar";
export default UIAvatar;
