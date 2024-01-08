/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { setStatus, setType } from "../context/modalSlice";
import SignIn from "../components/pages/public/Sign_in";

export default function ProtectedRoutes({ needAuth, needStaff }) {
  const { isVerified, role } = useSelector((state) => state.user.info_user);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  //check user login
  if (needAuth) {
    if (isVerified) {
      return <Outlet />;
    }

    if (!isVerified) {
      const handleChangeModal = () => {
        dispatch(setStatus(true));
        dispatch(setType(SignIn));
      };
      handleChangeModal();
      return <Navigate state={pathname} to={"/"} />;
    }
  }

  //check role sale
  if (needStaff == "Emp_Sale") {
    if (role == "Emp_Sale") {
      return <Outlet />;
    }

    if (role == "user" || role == null) {
      return <Navigate to="/" />;
    }
  }

  //check role tech
  if (needStaff == "Emp_Technician") {
    if (role == "Emp_Technician") {
      return <Outlet />;
    }

    if (role == "user" || role == null) {
      return <Navigate to="/" />;
    }
  }

  if (needStaff == "admin") {
    if (role == "admin") {
      return <Outlet />;
    }

    if (role == "user" || role == null) {
      return <Navigate to="/" />;
    }
  }

  return <Navigate to="/" />;
}
