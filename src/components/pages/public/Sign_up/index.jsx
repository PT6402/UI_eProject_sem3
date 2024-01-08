/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from "react";
import styles from "./index.module.scss";
import SignIn from "../Sign_in";
import { useDispatch } from "react-redux";
import { setType } from "../../../../context/modalSlice";
import {
  CheckPhone,
  ConvertToInternationalPhoneNumber,
} from "../../../../helpers/CheckAccountPhone";
import useSendOTP from "../../../../hooks/useSendOTP";
import { useAuth } from "../../../../hooks/useAuth";

export default function Sign_up() {
  //[USE_REF]

  const phoneInput = useRef();
  const otpInput = useRef();
  const fullNameInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();
  const [otpServer, setOtpServer] = useState(null);
  const [statusFormPass, setForm] = useState({ password: false, otp: false });
  const dispatch = useDispatch();
  const { checkAccount, verifyPhoneServer, register } = useAuth();
  const [statusOTP, setStatusOTP] = useState({
    isSending: false,
    status: false,
  });
  const { handleSendSMS, handleCheckOTP } = useSendOTP();
  const handleInputToOTP = async () => {
    otpInput.current.value = "";
    const { error, result } = CheckPhone(phoneInput);
    if (error != null) {
      phoneInput.current.value = "";
      phoneInput.current.placeholder = error;
    } else {
      setStatusOTP({ status: true, isSending: true });
      if (result.type == "phone") {
        const check = await checkAccount({
          account_phone: phoneInput.current.value,
          type: result.type,
        });

        if (check) {
          setForm((prev) => ({ ...prev, message: "account exist" }));
          setStatusOTP({ status: false, isSending: false });
          otpInput.current.value = "";
          phoneInput.current.value = "";
          phoneInput.current.focus();
          otpInput.current.placeholder = "enter pass/otp";
          return;
        }

        let statusSend = await handleSendSMS(
          ConvertToInternationalPhoneNumber(phoneInput.current.value)
        );
        console.log(
          statusSend,
          ConvertToInternationalPhoneNumber(phoneInput.current.value)
        );
        if (statusSend) {
          setStatusOTP({ status: true, isSending: false });
        } else {
          await verifyPhoneServer(phoneInput.current.value).then((res) =>
            setOtpServer(res)
          );
          setStatusOTP({ status: true, isSending: false });
        }
      }
    }
  };
  const handleChangeModalType = () => {
    dispatch(setType(SignIn));
  };
  //[SEND DATA]
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otpInput.current.value == "") {
      setForm({ password: false, otp: true });
      return;
    }
    if (statusOTP.status) {
      let result = await handleCheckOTP(otpInput.current.value);
      if (
        (otpInput.current.value == otpServer && !result) ||
        (result && otpServer == null) ||
        (result && otpServer != null)
      ) {
        if (
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{6,}$/.test(
            passwordInput.current.value
          )
        ) {
          if (
            confirmPasswordInput.current.value != passwordInput.current.value
          ) {
            confirmPasswordInput.current.value = "";
            confirmPasswordInput.current.placeholder = "not match";
            confirmPasswordInput.current.focus();
            return;
          } else {
            const data = {
              fullName: fullNameInput.current.value,
              phone: phoneInput.current.value,
              password: passwordInput.current.value,
            };
            await register(data);
            handleChangeModalType();
            return;
          }
        } else {
          setForm({ password: true, otp: false });
          passwordInput.current.value = "";
          passwordInput.current.focus();
          confirmPasswordInput.current.value = "";
          return;
        }
      } else {
        otpInput.current.value = "";
        otpInput.current.placeholder = "otp invalid";
        passwordInput.current.value = "";
        confirmPasswordInput.current.value = "";
        otpInput.current.focus();
        setStatusOTP({ status: true, isSending: false });
        return;
      }
    }
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.wrapper} main-container`}>
            <form onSubmit={handleSubmit} className={styles.form}>
              {statusFormPass.password && (
                <span style={{ color: "red" }}>
                  Password must have at least 6 characters with at least 1 digit
                  and 1 letter.
                </span>
              )}
              {statusFormPass?.message && (
                <span style={{ color: "red" }}>{statusFormPass.message}</span>
              )}
              {statusFormPass.otp && (
                <span style={{ color: "red" }}>Please send otp</span>
              )}
              <h2 className={styles.title}>Sign UP</h2>
              <label className={styles.label}>
                <span>Fullname :</span>
                <input
                  // defaultValue={defaultValue?.name || ""}
                  className={styles.input}
                  type="text"
                  required
                  ref={fullNameInput}
                />
              </label>
              <label className={styles.label}>
                <span>Phone :</span>
                <input
                  // defaultValue={defaultValue?.name || ""}
                  className={styles.input}
                  type="text"
                  required
                  ref={phoneInput}
                  onChange={() => setForm({ password: false, otp: false })}
                />
              </label>
              <label className={styles.label}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ paddingBottom: "10px" }}>OTP :</span>
                  <span
                    style={{
                      placeSelf: "flex-end",
                      paddingRight: "5px",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                      textDecoration: "underline",
                    }}
                    onClick={() => handleInputToOTP()}>
                    send OTP
                  </span>
                </div>
                <input
                  // defaultValue={defaultValue?.lastName || ""}
                  className={styles.input}
                  type="text"
                  placeholder={
                    statusOTP.status
                      ? statusOTP.isSending
                        ? "loadding..."
                        : "enter otp"
                      : null
                  }
                  required
                  ref={otpInput}
                  disabled={!statusOTP.status}
                  onChange={() => setForm({ password: false, otp: false })}
                />
              </label>

              <label className={styles.label}>
                <span>Password:</span>
                <input
                  className={styles.input}
                  type="password"
                  required
                  ref={passwordInput}
                  onChange={() => setForm({ password: false, otp: false })}
                />
              </label>
              <label className={styles.label}>
                <span>Confirm password:</span>
                <input
                  className={styles.input}
                  type="password"
                  required
                  ref={confirmPasswordInput}
                />
              </label>
              <button className={styles.button} type="submit">
                Sign up
              </button>
            </form>
            <p className={styles.login}>
              Already have an account?{" "}
              <span
                onClick={handleChangeModalType}
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontWeight: "700",
                }}>
                Login
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
