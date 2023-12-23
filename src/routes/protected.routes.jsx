/* eslint-disable react/prop-types */
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoutes({ needAuth, needStaff }) {
  const { pathname } = useLocation();

  //value context
  const isStaff = "admin";
  const isVerified = true;

  //check user login
  if (needAuth) {
    if (isVerified) {
      return <Outlet />;
    }

    if (!isVerified) {
      return <Navigate to="/account/login" state={pathname} />;
    }
  }

  //check role staff
  if (needStaff == "employee") {
    if (isStaff == "employee") {
      return <Outlet />;
    }

    if (!isStaff) {
      return <Navigate to="/" />;
    }
  }

  if (needStaff == "admin") {
    if (isStaff == "admin") {
      return <Outlet />;
    }

    if (!isStaff) {
      return <Navigate to="/" />;
    }
  }

  return <Navigate to="/" />;
}
