/* eslint-disable react/prop-types */
import { useRef } from "react";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { setType } from "../../../../context/modalSlice";
import Sign_up from "../Sign_up";
import Forgot_pass from "../Forgot_pass";
export default function SignIn() {
  const emailInput = useRef();
  const passwordInput = useRef();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };
    console.log(data);
  };
  const handleChangeModalType = (type) => {
    if (type == "sign-up") {
      dispatch(setType(Sign_up));
    } else {
      dispatch(setType(Forgot_pass));
    }
  };
  return (
    <>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.wrapper} main-container`}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <h2 className={styles.title}>Login</h2>
              <label className={styles.label}>
                <span>Phone / Account :</span>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="enter phone/account"
                  required
                  ref={emailInput}
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
                    }}>
                    send OTP
                  </span>
                </div>
                <input
                  className={styles.input}
                  type="password"
                  required
                  ref={passwordInput}
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
