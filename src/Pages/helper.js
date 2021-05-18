import React, { useEffect, useReducer, useState, useCallback } from "react";
import axios from "axios";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";

export const axiosMethod = async (type, url, formData) => {
  const method = await axios({
    method: type,
    url: url,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return method;
};

export async function fetch(url, formData) {
  const { data } = await axiosMethod("post", url, formData);
  return data;
}

export async function fetchMore(url, formData) {
  const { data } = await axiosMethod("post", url, formData);

  return data.data;
}

export const MediaQuery = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  // Return the width so we can use it in our components
  return { width };
};

export const useAsync = (url, formData) => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [value, setValue] = useState([]);

  useEffect(() => {
    let didCancel = false;

    async function fetchData() {
      const result = await axiosMethod("post", url, formData);

      if (!didCancel) {
        if (result.data.error === true) {
          setTimeout(() => {
            setError(result.data.error);
            setSuccess(result.data.status);
            setMessage(result.data.message);
            setLoading(false);
            setValue(null);
          }, 1000);
        }

        if (result.data.error === false) {
          setTimeout(() => {
            setValue(result.data.data);
            setLoading(false);
            setSuccess(result.data.status);
            setMessage(result.data.message);
            setError(null);
          }, 1000);
        }
      }
    }

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [formData]);

  return { value, message, error, loading, success };
};

export const useAsync2 = (keyword, url, data) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState();
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [value, setValue] = useState([]);

  const formData = new FormData();
  formData.set("search_phrase", data);

  useEffect(() => {
    let didCancel = false;
    setLoading(true);

    formData.set(keyword, data);

    async function fetchData() {
      const result = await axiosMethod("post", url, formData);

      if (!didCancel) {
        if (result.data.error === true) {
          setTimeout(() => {
            setError(result.data.error);
            setSuccess(result.data.status);
            setMessage(result.data.message);
            setLoading(false);
            setValue(null);
          }, 1000);
        }

        if (result.data.error === false) {
          setTimeout(() => {
            setValue(result.data.data);
            setLoading(false);
            setSuccess(result.data.status);
            setMessage(result.data.message);
            setError(null);
          }, 1000);
        }
      }
    }

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [data]);

  return { value, message, error, loading, success };
};

export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? item : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
