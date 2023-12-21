/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from "react";
import styles from "./index.module.scss";
import SignIn from "../Sign_in";
import { useDispatch } from "react-redux";
import { setType } from "../../../../context/modalSlice";

export default function Forgot_pass() {
  //[USE_REF]
  const phoneInput = useRef();
  const otpInput = useRef();
  const passwordInput = useRef();
  const confirmPasswordInput = useRef();
  const dispatch = useDispatch();

  //[SEND DATA]
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      Phone: phoneInput.current.value,
      OTP: otpInput.current.value,
      Password: passwordInput.current.value,
      ConfirmPassword: confirmPasswordInput.current.value,
    };
    console.log(data);
  };
  const handleChangeModalType = () => {
    dispatch(setType(SignIn));
  };
  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.wrapper} main-container`}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <h2 className={styles.title}>Forgot password</h2>
              <label className={styles.label}>
                <span>Phone / Account:</span>
                <input
                  // defaultValue={defaultValue?.name || ""}
                  className={styles.input}
                  type="text"
                  placeholder="enter phone/account"
                  required
                  ref={phoneInput}
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
                    }}>
                    send OTP
                  </span>
                </div>
                <input
                  // defaultValue={defaultValue?.lastName || ""}
                  className={styles.input}
                  type="text"
                  placeholder="enter OTP"
                  required
                  ref={otpInput}
                />
              </label>

              <label className={styles.label}>
                <span>Password new:</span>
                <input
                  className={styles.input}
                  type="password"
                  required
                  ref={passwordInput}
                />
              </label>
              <label className={styles.label}>
                <span>Confirm password new:</span>
                <input
                  className={styles.input}
                  type="password"
                  required
                  ref={confirmPasswordInput}
                />
              </label>
              <button className={styles.button} type="submit">
                Reset
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
