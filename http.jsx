/* eslint-disable no-undef */
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { set_access_token_user } from "context/userSlice";

const axiosAuthentication = axios.create();
axiosAuthentication.defaults.baseURL = "http://localhost:8000/";
axiosAuthentication.defaults.withCredentials = true;
axiosAuthentication.defaults.headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};
const handleRefreshToken = async (user, dispatch) => {
  try {
    const res = await axiosAuthentication.post("/refresh-token", user.userId);
    if (res.status == 200) {
      await dispatch(set_access_token_user(res.data.accessToken));
    }
  } catch (error) {
    console.log(error);
  }
};

const Auth_http = () => {
  const user = useSelector((state) => state.user.info_user);
  const dispatch = useDispatch();
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const accessToken = user.accessToken;
      if (accessToken != null) {
        const decodeToken = jwtDecode(accessToken);
        // check time expire accessToken
        if (decodeToken.exp < date.getTime() / 1000) {
          await handleRefreshToken(user, dispatch);
        }
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
export { Auth_http, axiosAuthentication };
