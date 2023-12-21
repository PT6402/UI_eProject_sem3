/* eslint-disable react/prop-types */
import { ErrorMessage, Field } from "formik";
import UIBox from "../../private/UIBox";
import UITypography from "../../private/UITypography";
import UIInput from "../../private/UIInput";

function FormField({ label, name, ...rest }) {
  return (
    <UIBox mb={1.5}>
      <UIBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <UITypography
          component="label"
          variant="caption"
          fontWeight="bold"
          textTransform="capitalize">
          {label}
        </UITypography>
      </UIBox>
      <Field {...rest} name={name} as={UIInput} />
      <UIBox mt={0.75}>
        <UITypography component="div" variant="caption" color="error">
          <ErrorMessage name={name} />
        </UITypography>
      </UIBox>
    </UIBox>
  );
}
export default FormField;
