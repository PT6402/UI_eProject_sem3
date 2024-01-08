/* eslint-disable no-unused-vars */
import { useState } from "react";
import { axiosAuthentication } from "../../http";
export function useCoupon() {
  //[STATUS]
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState();
  const gets = async () => {
    setError(false);
    setIsLoading(true);
    try {
      const urlP = "http://localhost:8000/api/Coupon";
      return await axiosAuthentication
        .get(urlP)
        .then(async ({ status, data }) => {
          if (status == 200) {
            return data;
          }
        });
    } catch (error) {
      setError(true);
      setMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  const update = async ({ data }) => {
    setError(false);
    setIsLoading(true);
    try {
      const url = "http://localhost:8000/api/Coupon";
      return await axiosAuthentication
        .put(url, data)
        .then(({ status, data }) => {
          if (status == 200) {
            return data;
          }
        });
    } catch (error) {
      setError(true);
      setMessage(error);
    } finally {
      setIsLoading(false);
    }
  };
  const create = async ({ data }) => {
    setError(false);
    setIsLoading(true);
    try {
      const url = "http://localhost:8000/api/Coupon";
      return await axiosAuthentication
        .post(url, data)
        .then(({ status, data }) => {
          if (status == 200) {
            return data;
          }
        });
    } catch (error) {
      setError(true);
      setMessage(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async ({ id }) => {
    setError(false);
    setIsLoading(true);
    try {
      const url = `http://localhost:8000/api/Coupon?id=${id}`;
      return await axiosAuthentication.delete(url).then(({ status, data }) => {
        if (status == 200) {
          return data;
        }
      });
    } catch (error) {
      setError(true);
      setMessage(error);
    } finally {
      setIsLoading(false);
    }
  };
  return { gets, error, message, isLoading, update, create, handleDelete };
}
