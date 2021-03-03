import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { itemsGet } from "./endpoints";

const intervalMs = 10000;

export async function fetchProjects(page = 0) {
  const { data } = await axios({
    method: "post",
    url: itemsGet,
    data: page,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}

export async function backendData(url, formData) {
  const { data } = await axios({
    method: "post",
    url: url,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
}

export function useProducts() {
  return useQuery(
    "products",
    async () => {
      const { data } = await axios.get(itemsGet);
      return data;
    },
    {
      refetchInterval: intervalMs,
    }
  );
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

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

export const useDataApi = (url, formData, initialData) => {
  const [state, dispatch] = React.useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  React.useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await axios({
          method: "post",
          url: url,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log(result);

        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [ ]);

  return [state];
};

export const axiosMethod = async (type, url, formData) => {
  const method = await axios({
    method: type,
    url: url,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return method;
};