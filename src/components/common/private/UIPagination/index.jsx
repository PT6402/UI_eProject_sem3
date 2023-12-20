import { forwardRef, createContext, useContext, useMemo } from "react";
import PropTypes from "prop-types";

// Soft UI Dashboard PRO React components/common
import UIBox from "components/common/private/UIBox";

// Custom styles for SoftPagination
import UIPaginationItemRoot from "components/common/private/UIPagination/UIPaginationItemRoot";

// The Pagination main context
const Context = createContext();

const UIPagination = forwardRef(
  ({ item, variant, color, size, active, children, ...rest }, ref) => {
    const context = useContext(Context);
    const paginationSize = context ? context.size : null;
    const value = useMemo(
      () => ({ variant, color, size }),
      [variant, color, size]
    );

    return (
      <Context.Provider value={value}>
        {item ? (
          <UIPaginationItemRoot
            {...rest}
            ref={ref}
            variant={active ? context.variant : "outlined"}
            color={active ? context.color : "secondary"}
            iconOnly
            circular
            ownerState={{ variant, active, paginationSize }}>
            {children}
          </UIPaginationItemRoot>
        ) : (
          <UIBox
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ listStyle: "none" }}>
            {children}
          </UIBox>
        )}
      </Context.Provider>
    );
  }
);

// Setting default values for the props of SoftPagination
UIPagination.defaultProps = {
  item: false,
  variant: "gradient",
  color: "info",
  size: "medium",
  active: false,
};

// Typechecking props for the SoftPagination
UIPagination.propTypes = {
  item: PropTypes.bool,
  variant: PropTypes.oneOf(["gradient", "contained"]),
  color: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
UIPagination.displayName = "UIPagination";
export default UIPagination;
