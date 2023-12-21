import * as Yup from "yup";
import form from "./form";

const {
  formField: { phone_account, pass_otp },
} = form;

const validations = [
  Yup.object().shape({
    [phone_account.name]: Yup.string().required(phone_account.errorMsg),
    [pass_otp.name]: Yup.string().required(pass_otp.errorMsg),
  }),
];

export default validations;
