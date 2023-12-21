const form = {
  formId: "form-login",
  formField: {
    phone_account: {
      name: "phone_account",
      label: "Phone/Account",
      type: "text",
      placeholder: "Enter phone/account",
      errorMsg: "Phone/Account is not empty",
    },
    pass_otp: {
      name: "pass_otp",
      label: "Password/OTP code",
      type: "text",
      placeholder: "Enter Password/OTP code",
      errorMsg: "Password/OTP code is not empty",
    },
  },
};
export default form;
