const form = {
  formId: "form-login",
  formField: {
    account_phone: {
      name: "account_phone",
      label: "Account/Phone",
      type: "text",
      placeholder: "Enter account/phone",
      errorMsg: [
        "account/phone is not empty",
        "account invalid",
        "phone is invalid",
      ],
    },
    otp_pass: {
      name: "otp_pass",
      label: "OTP/Password",
      type: "password",
      placeholder: "Enter Password/OTP code",
      errorMsg: "OTP/Password is not empty",
    },
  },
};
export default form;
