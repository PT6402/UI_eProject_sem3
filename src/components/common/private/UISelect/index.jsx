import { forwardRef } from "react";
import PropTypes from "prop-types";
import Select from "react-select";

// Soft UI Dashboard PRO React base styles
import colors from "assets/themes/private/base/colors";

// Custom styles for SoftSelect
import styles from "./styles";

const UISelect = forwardRef(
  ({ size, error, success, custom, ...rest }, ref) => {
    const { light } = colors;

    return (
      <Select
        {...rest}
        style={{ zIndex: "99999999 !importan" }}
        ref={ref}
        styles={styles(size, error, success, custom)}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: light.main,
            primary: light.main,
          },
        })}
      />
    );
  }
);

// Setting default values for the props of SoftSelect
UISelect.defaultProps = {
  size: "medium",
  error: false,
  success: false,
};

// Typechecking props for the UISelect
UISelect.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  error: PropTypes.bool,
  success: PropTypes.bool,
};
UISelect.displayName = "UISelect";
export default UISelect;
