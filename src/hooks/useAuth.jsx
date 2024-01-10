import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Auth_http, axiosAuthentication } from "../../http";
import useSendOTP from "./useSendOTP";
import { remove_info_user, set_info_user } from "../context/userSlice";
import { setStatus, setType, setValue } from "../context/modalSlice";
import Forgot_pass from "../components/pages/public/Forgot_pass";
import SignIn from "../components/pages/public/Sign_in";
import { useEmployee } from "./useEmployee";

export function useAuth() {
  //[dispatch-navigate]

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //[store-user]
  const info_user = useSelector((state) => state.user.info_user);
  const { gets } = useEmployee();
  const axiosAuth = Auth_http();
  //[status]
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState();
  const login = async ({ account_phone, otp_pass, type, otp }) => {
    setError(null);
    setIsLoading(true);

    try {
      const data = {
        accountPhone: account_phone,
        otpPass: otp_pass,
        type,
        otp,
      };
      const req = {
        phone: data.accountPhone,
        password: data.otpPass,
        verifyOtp: otp,
      };
      return await axiosAuthentication
        .post("http://localhost:8000/login", req)
        .then(async ({ status, data }) => {
          if (status == 200) {
            let info;
            if (data.role.includes("Emp_")) {
              info = await gets().then((res) => {
                const employee_find = res.find(
                  ({ phone }) => phone == data.phone
                );
                return {
                  userId: data.id,
                  fullName: data.fullName,
                  email: data.email,
                  phone: data.phone,
                  role: data.role,
                  isVerified: true,
                  accessToken: data.token,
                  tp_contract_id: data.tp_contract_id,
                  employee_id: employee_find.id,
                  address_store_id: employee_find.address_store_id,
                };
              });
            } else {
              info = {
                userId: data.id,
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                role: data.role,
                isVerified: true,
                accessToken: data.token,
                tp_contract_id: data.tp_contract_id,
              };
            }
            dispatch(set_info_user(info));
            dispatch(setStatus(false));
            dispatch(setType(null));
            dispatch(setValue(null));
            return;
          }
        });
    } catch (error) {
      setError(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAccount = async ({ account_phone, type }) => {
    setError(null);
    setIsLoading(true);
    try {
      // console.log(account_phone, type);
      return await axiosAuthentication
        .post("http://localhost:8000/check-account", {
          accountPhone: account_phone,
          type,
        })
        .then((res) => {
          if (res.status == 200) {
            return res.data;
          }
        });
    } catch (error) {
      console.log(error);
      setError(true);
      setMessage(error);
    }
  };
  const verifyPhoneServer = async (phone) => {
    setError(null);
    setIsLoading(true);
    try {
      return await axiosAuthentication
        .get(`http://localhost:8000/verify-phone/${phone}`)
        .then((res) => {
          if (res.status == 200) {
            return res.data;
          }
        });
    } catch (error) {
      console.log(error);
      setError(true);
      setMessage(error);
    }
  };

  const register = async (data) => {
    setError(null);
    setIsLoading(true);
    try {
      const req = {
        fullName: data.fullName,
        phone: data.phone,
        password: data.password,
      };
      return await axiosAuthentication
        .post(`http://localhost:8000/sign-up`, req)
        .then((res) => {
          if (res.status == 200) {
            dispatch(set_info_user({ ...info_user, phone: res.data }));
            return res.data;
          }
        });
    } catch (error) {
      console.log(error);
      setError(true);
      setMessage(error);
    }
  };

  const logout = async () => {
    try {
      return await axiosAuth.get(`http://localhost:8000/logout`).then((res) => {
        if (res.status == 200) {
          navigate("/");
          dispatch(remove_info_user());
          return res.data;
        }
      });
    } catch (error) {
      console.log(error);
      setError(true);
      setMessage(error);
    }
  };
  const resetPass = async (data) => {
    try {
      const req = {
        phone: data.phone,
        newPass: data.newPass,
      };
      return await axiosAuth
        .post(`http://localhost:8000/reset-pass`, req)
        .then((res) => {
          if (res.status == 200) {
            dispatch(set_info_user({ ...info_user, phone: res.data }));
            return res.data;
          }
        });
    } catch (error) {
      console.log(error);
      setError(true);
      setMessage(error);
    }
  };
  const checkReloadPage = async () => {
    setError(false);
    setIsLoading(true);
    try {
      return await axiosAuthentication
        .get(`http://localhost:8000/check-login`)
        .then(async ({ status, data }) => {
          if (status == 200) {
            let info;
            if (data.role.includes("Emp_")) {
              info = await gets().then((res) => {
                const employee_find = res.find(
                  ({ phone }) => phone == data.phone
                );
                return {
                  userId: data.id,
                  fullName: data.fullName,
                  email: data.email,
                  phone: data.phone,
                  role: data.role,
                  isVerified: true,
                  accessToken: data.token,
                  tp_contract_id: data.tp_contract_id,
                  employee_id: employee_find.id,
                  address_store_id: employee_find.address_store_id,
                };
              });
            } else {
              info = {
                userId: data.id,
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                role: data.role,
                isVerified: true,
                accessToken: data.token,
                tp_contract_id: data.tp_contract_id,
              };
            }
            dispatch(set_info_user(info));
            return;
          }
        });
    } catch (error) {
      console.log(error);
      setError(true);
      setMessage(error);
    } finally {
      setIsLoading(false);
    }
  };
  const changePass = async ({ data }) => {
    try {
      const req = {
        user_Id: info_user.userId,
        current_pass: data.currentPass,
        new_pass: data.newPass,
        confirm_pass: data.confirmPass,
      };
      return await axiosAuthentication
        .put("http://localhost:8000/api/User/change_pass", req)
        .then((res) => {
          if (res.status == 200) {
            return res.data;
          } else return res.data;
        });
    } catch (error) {
      console.log(error);
      setError(error.response.data);
      setMessage(error);
    }
  };
  const updateProfile = async ({ data }) => {
    try {
      const req = {
        user_Id: info_user?.userId,
        fullname: data.fullName,
        email: data.email,
      };
      return await axiosAuthentication
        .put("http://localhost:8000/api/User/update_profile", req)
        .then((res) => {
          if (res.status == 200) {
            dispatch(
              set_info_user({
                ...info_user,
                fullName: res.data.model.fullname,
                email: res.data.model.email,
              })
            );
          }
          setMessage(res.data.message);
        });
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };

  return {
    updateProfile,
    changePass,
    login,
    checkAccount,
    verifyPhoneServer,
    register,
    logout,
    resetPass,
    checkReloadPage,
    isLoading,
    error,
    message,
  };
}
