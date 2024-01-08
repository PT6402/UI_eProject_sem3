/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import PropTypes from "prop-types";
import UIBadgeRoot from "components/common/private/UIBadge/UIBadgeRoot";

const UIBadge = forwardRef(
  (
    {
      color,
      variant,
      size,
      circular,
      indicator,
      border,
      container,
      children,
      paddingCus,
      ...rest
    },
    ref
  ) => (
    <UIBadgeRoot
      {...rest}
      ownerState={{
        color,
        variant,
        size,
        circular,
        indicator,
        border,
        container,
        children,
        paddingCus,
      }}
      ref={ref}
      color="default">
      {children}
    </UIBadgeRoot>
  )
);

// Setting default values for the props of SoftBadge
UIBadge.defaultProps = {
  color: "info",
  variant: "gradient",
  size: "sm",
  circular: false,
  indicator: false,
  border: false,
  children: false,
  container: false,
};

// Typechecking props of the SoftBadge
UIBadge.propTypes = {
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
  variant: PropTypes.oneOf(["gradient", "contained"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
  circular: PropTypes.bool,
  indicator: PropTypes.bool,
  border: PropTypes.bool,
  children: PropTypes.node,
  container: PropTypes.bool,
};
UIBadge.displayName = "UIBadge";
export default UIBadge;
