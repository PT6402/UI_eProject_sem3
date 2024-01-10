/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosAuthentication } from "../../http";

import { convertCodeToRegion } from "../components/pages/private/admin/Address_store/data";
import { setValue } from "../context/supplierSlice";

export function useProduct() {
  const info_user = useSelector((state) => state.user.info_user);
  //[STATUS]
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState();
  const gets = async () => {
    setError(false);
    setIsLoading(true);
    try {
      const urlP = "http://localhost:8000/api/Product";
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
  const gets_AddressStore = async () => {
    setError(false);
    setIsLoading(true);
    try {
      const urlP = `http://localhost:8000/api/ImportReceipt/product-id/address_store_id?address_store_id=${info_user.address_store_id}`;
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
      const url = "http://localhost:8000/api/Product";
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
  const importProduct = async ({ data }) => {
    setError(false);
    setIsLoading(true);
    try {
      const url = "http://localhost:8000/api/Product";
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
      const url = "http://localhost:8000/api/Product";
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
      const url = `http://localhost:8000/api/Product?id=${id}`;
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
  return {
    gets,
    error,
    message,
    isLoading,
    update,
    create,
    handleDelete,
    gets_AddressStore,
    importProduct,
  };
}
