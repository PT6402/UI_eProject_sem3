import { forwardRef } from "react";
import PropTypes from "prop-types";

// Custom styles for SoftSocialButton
import UISocialButtonRoot from "components/common/private/UISocialButton/UISocialButtonRoot";

const UISocialButton = forwardRef(
  ({ color, size, iconOnly, circular, children, ...rest }, ref) => (
    <UISocialButtonRoot
      {...rest}
      ref={ref}
      variant="contained"
      color="primary"
      size={size}
      ownerState={{ color, size, iconOnly, circular }}>
      {children}
    </UISocialButtonRoot>
  )
);

// Setting default values for the props of UISocialButton
UISocialButton.defaultProps = {
  size: "medium",
  color: "facebook",
  iconOnly: false,
  circular: false,
};

// Typechecking props for the UISocialButton
UISocialButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "facebook",
    "twitter",
    "instagram",
    "linkedin",
    "pinterest",
    "youtube",
    "github",
    "vimeo",
    "slack",
    "dribbble",
    "reddit",
    "tumblr",
  ]),
  iconOnly: PropTypes.bool,
  circular: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
UISocialButton.displayName = "UISocialButton";
export default UISocialButton;
