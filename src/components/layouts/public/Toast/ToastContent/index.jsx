/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { IoIosCheckmarkCircle, IoIosAlert } from "react-icons/io";
import styles from "./index.module.scss";

const ToastContent = ({ message, close, status }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      close();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);
  let typeToast = {
    colorToast: null,
    title: null,
    icon: null,
  };

  switch (status) {
    case 1:
      typeToast = {
        colorToast: `${styles.addToCart} ${styles.success}`,
        title: "Success.",
        icon: <IoIosCheckmarkCircle />,
      };
      break;
    case 2:
      typeToast = {
        colorToast: styles.error,
        title: "Error.",
        icon: <IoIosAlert />,
      };
      break;
    default:
      typeToast;
      break;
  }
  return (
    <div onClick={close} className={`${typeToast.colorToast}`}>
      <div className={styles.content_wrapper}>
        <div>
          <p className={styles.title}>{typeToast.title}</p>
          <p className={styles.details}>{message}</p>
        </div>
      </div>
      <i className={styles.icon}>{typeToast.icon}</i>
    </div>
  );
};

export default ToastContent;
