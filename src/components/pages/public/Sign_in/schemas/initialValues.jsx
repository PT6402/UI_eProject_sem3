import form from "./form";
const {
  formField: { phone_account, pass_otp },
} = form;

const initialValues = {
  [phone_account.name]: "",
  [pass_otp.name]: "",
};
export default initialValues;
