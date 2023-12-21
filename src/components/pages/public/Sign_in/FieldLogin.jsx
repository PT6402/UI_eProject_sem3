/* eslint-disable react/prop-types */
import { UIBox } from "../../../common";
import FormField from "../../../common/public/UIForm/FormField";

export default function FieldLogin({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { phone_account, pass_otp } = formField;
  const { phone_account: phone_accountV, pass_otp: pass_otpV } = values;
  return (
    <UIBox
      mt={1.625}
      sx={() => ({
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        fontSize: "1.4rem",
      })}>
      <FormField
        type={phone_account.type}
        label={phone_account.label}
        name={phone_account.name}
        value={phone_accountV}
        placeholder={phone_account.placeholder}
        error={errors.firstName && touched.firstName}
        success={phone_accountV.length > 0 && !errors.firstName}
      />

      <FormField
        type={pass_otp.type}
        label={pass_otp.label}
        name={pass_otp.name}
        value={pass_otpV}
        placeholder={pass_otp.placeholder}
        error={errors.pass_otp && touched.pass_otp}
        success={pass_otpV.length > 0 && !errors.pass_otp}
      />
    </UIBox>
  );
}
