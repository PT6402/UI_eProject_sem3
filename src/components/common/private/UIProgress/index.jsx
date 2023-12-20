import { forwardRef } from "react";
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components/common
import UITypography from "components/common/private/UITypography";

// Custom styles for SoftProgress
import UIProgressRoot from "components/common/private/UIProgress/UIProgressRoot";

const UIProgress = forwardRef(
  ({ variant, color, value, label, ...rest }, ref) => (
    <>
      {label && (
        <UITypography variant="button" fontWeight="medium" color="text">
          {value}%
        </UITypography>
      )}
      <UIProgressRoot
        {...rest}
        ref={ref}
        variant="determinate"
        value={value}
        ownerState={{ color, value, variant }}
      />
    </>
  )
);

// Setting default values for the props of SoftProgress
UIProgress.defaultProps = {
  variant: "contained",
  color: "info",
  value: 0,
  label: false,
};

// Typechecking props for the SoftProgress
UIProgress.propTypes = {
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
  value: PropTypes.number,
  label: PropTypes.bool,
};
UIProgress.displayName = "UIProgress";
export default UIProgress;
