import PropTypes from "prop-types";
import { UIBox, UIInput, UITypography } from "../../../../../common";

function FormField({ label, ...rest }) {
  return (
    <>
      <UIBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <UITypography
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize">
          {label}
        </UITypography>
      </UIBox>
      <UIInput {...rest} />
    </>
  );
}

// typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FormField;
