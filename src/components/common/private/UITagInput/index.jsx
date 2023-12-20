import { forwardRef } from "react";
import PropTypes from "prop-types";

// react-tag-input components/common
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

// Custom styles for SoftTagInput
import UITagInputRoot from "components/common/private/UITagInput/UITagInputRoot";

const UITagInput = forwardRef(({ size, error, success, ...rest }, ref) => (
  <UITagInputRoot ownerState={{ size, error, success }}>
    <ReactTagInput {...rest} ref={ref} />
  </UITagInputRoot>
));

// Setting default values for the props of UITagInput
UITagInput.defaultProps = {
  size: "medium",
  error: false,
  success: false,
};

// Typechecking props for the UITagInput
UITagInput.propTypes = {
  size: PropTypes.oneOf(["medium", "large"]),
  error: PropTypes.bool,
  success: PropTypes.bool,
};
UITagInput.displayName = "UITagInput";
export default UITagInput;
