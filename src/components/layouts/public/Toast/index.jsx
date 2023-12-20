/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "hooks/useToast";
import { useSelector } from "react-redux";
//
import ToastModal from "./ToastModal";
import ToastContent from "./ToastContent";

const Toast = () => {
  const { pathname } = useLocation();

  const toast = useSelector((state) => state.toast.currentToast);
  const handleStatus = () => {
    const { success, error } = toast;
    if (success) {
      return 1;
    }
    if (error) {
      return 2;
    }
  };
  const status = handleStatus();
  const { close } = useToast();

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    } else {
      setTimeout(() => {
        close();
      }, 100);
    }
  }, [pathname]);
  return (
    <ToastModal message={toast.message}>
      {toast.message && (
        <ToastContent message={toast.message} status={status} close={close} />
      )}
    </ToastModal>
  );
};

export default Toast;
