/* eslint-disable no-unused-vars */
import { useState } from "react";
import { axiosAuthentication } from "../../http";
export function usePackage() {
  //[STATUS]
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState();
  const gets = async () => {
    setError(false);
    setIsLoading(true);
    try {
      const urlP = "http://localhost:8000/api/Package";
      const urlD = "http://localhost:8000/api/Duration";
      const packages = await axiosAuthentication
        .get(urlP)
        .then(async ({ status, data }) => {
          if (status == 200) {
            return data;
          }
        });
      const durations = await axiosAuthentication
        .get(urlD)
        .then(async ({ status, data }) => {
          if (status == 200) {
            return data;
          }
        });
      return { packages, durations };
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
      const url = "http://localhost:8000/api/Package";
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
  const updateDuration = async ({ data }) => {
    setError(false);
    setIsLoading(true);
    try {
      const url = "http://localhost:8000/api/Duration";
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
      const url = "http://localhost:8000/api/Package";
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
  const createDuration = async ({ data }) => {
    setError(false);
    setIsLoading(true);
    try {
      const url = "http://localhost:8000/api/Duration";
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

  const handleDeleteDuration = async ({ id }) => {
    setError(false);
    setIsLoading(true);
    try {
      const url = `http://localhost:8000/api/Duration?id=${id}`;
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
  const handleDeletePackage = async ({ id }) => {
    setError(false);
    setIsLoading(true);
    try {
      const url = `http://localhost:8000/api/Package?id=${id}`;
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
    handleDeleteDuration,
    createDuration,
    handleDeletePackage,
    updateDuration,
  };
}
