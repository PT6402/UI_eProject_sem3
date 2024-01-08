import { forwardRef } from "react";
import PropTypes from "prop-types";

// Custom styles for UIInput
import UIInputRoot from "components/common/private/UIInput/UIInputRoot";
import UIInputWithIconRoot from "components/common/private/UIInput/UIInputWithIconRoot";
import UIInputIconBoxRoot from "components/common/private/UIInput/UIInputIconBoxRoot";
import UIInputIconRoot from "components/common/private/UIInput/UIInputIconRoot";

const UIInput = forwardRef(
  ({ size, icon, error, success, disabled, ...rest }, ref) => {
    let template;
    const iconDirection = icon.direction;
    if (icon.component && icon.direction === "left") {
      template = (
        <UIInputWithIconRoot
          ref={ref}
          ownerState={{ error, success, disabled }}>
          <UIInputIconBoxRoot ownerState={{ size }}>
            <UIInputIconRoot fontSize="small" ownerState={{ size }}>
              {icon.component}
            </UIInputIconRoot>
          </UIInputIconBoxRoot>
          <UIInputRoot
            {...rest}
            ownerState={{
              size,
              error,
              success,
              iconDirection,
              disabled,
            }}
          />
        </UIInputWithIconRoot>
      );
    } else if (icon.component && icon.direction === "right") {
      template = (
        <UIInputWithIconRoot
          ref={ref}
          ownerState={{ error, success, disabled }}>
          <UIInputRoot
            {...rest}
            ownerState={{
              size,
              error,
              success,
              iconDirection,
              disabled,
            }}
          />
          <UIInputIconBoxRoot ownerState={{ size }}>
            <UIInputIconRoot fontSize="small" ownerState={{ size }}>
              {icon.component}
            </UIInputIconRoot>
          </UIInputIconBoxRoot>
        </UIInputWithIconRoot>
      );
    } else {
      template = (
        <UIInputRoot
          {...rest}
          ref={ref}
          ownerState={{ size, error, success, disabled }}
        />
      );
    }

    return template;
  }
);

// Setting default values for the props of SoftInput
UIInput.defaultProps = {
  size: "medium",
  icon: {
    component: false,
    direction: "none",
  },
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the UIInput
UIInput.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large", "uipublic"]),
  icon: PropTypes.shape({
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    direction: PropTypes.oneOf(["none", "left", "right"]),
  }),
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};
UIInput.displayName = "UIInput";
export default UIInput;
