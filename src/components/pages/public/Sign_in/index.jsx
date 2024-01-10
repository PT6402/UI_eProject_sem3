/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setType } from "../../../../context/modalSlice";
import Sign_up from "../Sign_up";
import Forgot_pass from "../Forgot_pass";
import { useAuth } from "../../../../hooks/useAuth";
import useSendOTP from "../../../../hooks/useSendOTP";
import CheckAccountPhone, {
  CheckPhone,
  ConvertToInternationalPhoneNumber,
} from "../../../../helpers/CheckAccountPhone";
import { useToast } from "../../../../hooks/useToast";
import Loader from "../../../common/public/Loader";
export default function SignIn() {
  const [notify, setNotify] = useState(false);
  const { sendToast } = useToast();
  const [statusOTP, setStatusOTP] = useState({
    isSending: false,
    status: false,
  });
  const info_user = useSelector((state) => state.user.info_user);
  const { handleSendSMS, handleCheckOTP } = useSendOTP();
  const { login, checkAccount, verifyPhoneServer, isLoading, error } =
    useAuth();
  const acc_phoneInput = useRef();
  const otp_passInput = useRef();
  const dispatch = useDispatch();
  const [otpServer, setOtpServer] = useState(null);
  const [statusFormPass, setForm] = useState({ password: false, otp: false });
  const handleLogin = async () => {
    const { result } = CheckAccountPhone(acc_phoneInput);
    if (result.type == "account") {
      const check = await checkAccount({
        account_phone: acc_phoneInput.current.value,
        type: result.type,
      });
      const data = {
        account_phone: check,
        otp_pass: otp_passInput.current.value,
        type: result.type,
        otp: statusOTP.status,
      };
      await login(data);
      console.log(data);
      setNotify(true);
    } else {
      const data = {
        account_phone: acc_phoneInput.current.value,
        otp_pass: otp_passInput.current.value,
        type: result.type,
        otp: statusOTP.status,
      };
      await login(data);
      console.log(data);
      setNotify(true);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, result } = CheckAccountPhone(acc_phoneInput);
    if (error) {
      acc_phoneInput.current.value = "";
      acc_phoneInput.current.placeholder = error;
      otp_passInput.current.value = "";
      return;
    }
    if (statusOTP.status) {
      if (/^[^A-Za-z]{6}$/.test(otp_passInput.current.value)) {
        let result = await handleCheckOTP(otp_passInput.current.value);
        if (
          (otp_passInput.current.value == otpServer && !result) ||
          (result && otpServer == null) ||
          (result && otpServer != null)
        ) {
          await handleLogin(result);
          return;
        } else {
          acc_phoneInput.current.value = "";
          otp_passInput.current.value = "";
          setStatusOTP({ status: false, isSending: false });

          //nofication fail otp
          return;
        }
      } else {
        await handleLogin(result);
        return;
      }
    } else {
      await handleLogin(result);
      return;
    }
  };
  const handleInputToOTP = async () => {
    setForm((prev) => ({ ...prev }));
    const { error, result } = CheckAccountPhone(acc_phoneInput);
    if (error != null) {
      acc_phoneInput.current.value = "";
      acc_phoneInput.current.placeholder = error;
      otp_passInput.current.value = "";
      otp_passInput.current.placeholder = "";
    } else {
      setStatusOTP({ status: true, isSending: true });
      if (result.type == "phone") {
        otp_passInput.current.value = "";

        const check = await checkAccount({
          account_phone: acc_phoneInput.current.value,
          type: result.type,
        });

        if (!check) {
          setForm((prev) => ({ ...prev, message: "account null" }));
          setStatusOTP({ status: false, isSending: false });
          otp_passInput.current.value = "";
          acc_phoneInput.current.value = "";
          acc_phoneInput.current.focus();
          otp_passInput.current.placeholder = "enter pass/otp";
          return;
        }

        let statusSend = await handleSendSMS(
          ConvertToInternationalPhoneNumber(acc_phoneInput.current.value)
        );
        if (statusSend) {
          setStatusOTP({ status: true, isSending: false });
        } else {
          await verifyPhoneServer(acc_phoneInput.current.value).then((res) =>
            setOtpServer(res)
          );
          setStatusOTP({ status: true, isSending: false });
        }
      } else {
        const check = await checkAccount({
          account_phone: acc_phoneInput.current.value,
          type: result.type,
        });

        if (!check) {
          setForm((prev) => ({ ...prev, message: "account null" }));
          setStatusOTP({ status: false, isSending: false });
          otp_passInput.current.value = "";
          acc_phoneInput.current.value = "";
          acc_phoneInput.current.focus();
          otp_passInput.current.placeholder = "enter pass/otp";
          return;
        }
        //get phone from server by account
        let statusSend = await handleSendSMS(
          ConvertToInternationalPhoneNumber(check)
        );
        if (statusSend) {
          setStatusOTP({ status: true, isSending: false });
        } else {
          await verifyPhoneServer(check).then((res) => setOtpServer(res));
          setStatusOTP({ status: true, isSending: false });
        }
      }
    }
  };
  const handleChangeModalType = (type) => {
    if (type == "sign-up") {
      dispatch(setType(Sign_up));
    } else {
      dispatch(setType(Forgot_pass));
    }
  };
  useEffect(() => {
    if (notify) {
      if (error) {
        sendToast({ error: true, message: error });
        setNotify(false);
      } else {
        close();
      }
    }
  }, [notify]);
  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.wrapper} main-container`}>
            <form onSubmit={handleSubmit} className={styles.form}>
              {statusFormPass.otp && (
                <span style={{ color: "red" }}>Please send otp</span>
              )}
              {statusFormPass?.message && (
                <span style={{ color: "red" }}>{statusFormPass.message}</span>
              )}
              <h2 className={styles.title}>Login</h2>
              <label className={styles.label}>
                <span>Phone / Account :</span>
                <input
                  className={styles.input}
                  type="text"
                  required
                  defaultValue={info_user.phone}
                  ref={acc_phoneInput}
                  onChange={() => setForm({ password: false, otp: false })}
                />
              </label>
              <label className={styles.label}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ paddingBottom: "10px" }}>
                    Password / OTP code :
                  </span>
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
                  className={styles.input}
                  type="password"
                  required
                  ref={otp_passInput}
                  placeholder={
                    statusOTP.status
                      ? statusOTP.isSending
                        ? "loadding..."
                        : "enter otp"
                      : null
                  }
                  onChange={() => setForm({ password: false, otp: false })}
                />
              </label>
              <button className={styles.button} type="submit">
                Login
              </button>
            </form>
            <p className={styles.no_account}>
              Not account?{" "}
              <span
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontWeight: "700",
                }}
                onClick={() => handleChangeModalType("sign-up")}>
                Create account
              </span>
            </p>
            <p className={styles.no_account}>
              <span
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontWeight: "700",
                }}
                onClick={() => handleChangeModalType("forgot_pass")}>
                Forgot password
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
