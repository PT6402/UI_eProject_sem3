import { useState } from "react";
import { useDispatch } from "react-redux";
import { axiosAuthentication } from "../../http";
import { setValue } from "../context/dataAdmin";
import { convertCodeToRegion } from "../components/pages/private/admin/Address_store/data";

export function useAddressStore() {
  //[STORE]
  const dispatch = useDispatch();

  //[STATUS]
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState();

  const gets = async () => {
    setError(false);
    setIsLoading(true);
    try {
      const url = "http://localhost:8000/api/AddressStore";
      return await axiosAuthentication.get(url).then(({ status, data }) => {
        if (status == 200) {
          const dataApi = [];
          data.map((item) => {
            const newItem = { ...item };
            const { id, name } = convertCodeToRegion(item.phone_code);
            newItem.phone_name = name;
            newItem.region_id = id;
            dataApi.push(newItem);
          });
          // dispatch(setValue(dataApi));
          return dataApi;
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
      const url = "http://localhost:8000/api/AddressStore";
      return await axiosAuthentication
        .put(url, data)
        .then(({ status, data }) => {
          if (status == 200) {
            const dataApi = [];
            data.map((item) => {
              const newItem = { ...item };
              const { id, name } = convertCodeToRegion(item.phone_code);
              newItem.phone_name = name;
              newItem.region_id = id;
              dataApi.push(newItem);
            });
            // dispatch(setValue(dataApi));
            return dataApi;
          }
        });
    } catch (error) {
      setError(true);
      setMessage(error);
    } finally {
      setIsLoading(false);
    }
  };
  const create = async ({ dataRes2 }) => {
    setError(false);
    setIsLoading(true);
    try {
      const url = "http://localhost:8000/api/AddressStore";
      return await axiosAuthentication
        .post(url, dataRes2)
        .then(({ status, data }) => {
          if (status == 200) {
            const dataApi = [];
            data.map((item) => {
              const newItem = { ...item };
              const { id, name } = convertCodeToRegion(item.phone_code);
              newItem.phone_name = name;
              newItem.region_id = id;
              dataApi.push(newItem);
            });
            // dispatch(setValue(dataApi));
            return dataApi;
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
      const url = `http://localhost:8000/api/AddressStore?id=${id}`;
      return await axiosAuthentication.delete(url).then(({ status, data }) => {
        if (status == 200) {
          const dataApi = [];
          data.map((item) => {
            const newItem = { ...item };
            const { id, name } = convertCodeToRegion(item.phone_code);
            newItem.phone_name = name;
            newItem.region_id = id;
            dataApi.push(newItem);
          });
          // dispatch(setValue(dataApi));
          return dataApi;
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
