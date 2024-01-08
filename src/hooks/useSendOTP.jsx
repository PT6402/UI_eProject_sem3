import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { authentication } from "../../firebase-config";

export default function useSendOTP() {
  authentication.settings.appVerificationDisabledForTesting = true;
  const generateRecaptcha = () => {
    return (window.recaptchaVerifier = new RecaptchaVerifier(
      authentication,
      "sign-in-button",
      {
        size: "invisible",
        callback: () => {},
      }
    ));
  };
  const handleSendSMS = async (toPhone = "+84971866177") => {
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    // +84908451611 : anh hieu
    return await signInWithPhoneNumber(authentication, toPhone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };
  const handleCheckOTP = async (codeOTP) => {
    let confirmationResult = window.confirmationResult;
    const check = await confirmationResult
      ?.confirm(codeOTP)
      .then((result) => {
        console.log(result);
        document.getElementById("recaptcha-container").innerHTML =
          "<div id='sign-in-button'></div>";
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });

    if (check) {
      return true;
    } else {
      return false;
    }
  };
  return { handleCheckOTP, handleSendSMS };
}
