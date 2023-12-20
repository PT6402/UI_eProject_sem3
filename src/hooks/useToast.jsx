import { useDispatch } from "react-redux";
import { Success, Close, Error } from "context/toastSlice";

export const useToast = () => {
  const dispatch = useDispatch();

  const sendToast = ({ success, error, message }) => {
    if (success) {
      dispatch(Success(message));
    }

    if (error) {
      dispatch(Error(message));
    }
  };

  const close = () => {
    dispatch(Close());
  };

  return { sendToast, close };
};
