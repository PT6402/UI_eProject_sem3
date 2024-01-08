/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { axiosAuthentication } from "../../http";

import { convertCodeToRegion } from "../components/pages/private/admin/Address_store/data";
import { setValue } from "../context/supplierSlice";

export function useSupplier() {
  //[STATUS]
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState();

  const dispatch = useDispatch();
  const gets = async () => {
    setError(false);
    setIsLoading(true);
    try {
      const url = "http://localhost:8000/api/Supplier";
      return await axiosAuthentication.get(url).then(({ status, data }) => {
        if (status == 200) {
          const dataRes = data.map((item) => {
            const { brandName, ...rest } = item;
            const newItem = rest;
            newItem.brand_name = brandName;
            return newItem;
          });
          // dispatch(setValue(dataRes));
          return dataRes;
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
      const url = "http://localhost:8000/api/Supplier";
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
      const url = "http://localhost:8000/api/Supplier";
      return await axiosAuthentication
        .post(url, data)
        .then(({ status, data }) => {
          if (status == 200) {
            // dispatch(setValue(dataApi));
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
      const url = `http://localhost:8000/api/Supplier?id=${id}`;
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
