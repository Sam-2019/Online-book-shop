import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { itemsGet } from "./endpoints";
// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";

const intervalMs = 10000;

export const axiosMethod = async (type, url, formData) => {
  const method = await axios({
    method: type,
    url: url,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return method;
};

export async function fetchProjects(formData) {
  const { data } = await axios({
    method: "post",
    url: itemsGet,
    data: formData,
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

export const useDataApi = (url, formData) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: [],
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const { data } = await axiosMethod("post", url, formData);

        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: data });
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
  }, []);

  return [state];
};

//  dayjs.extend(relativeTime);

// var dateData =dayjs("2013-03-10T02:00:00Z").fromNow() ;
// console.log(dateData)

// function myFunction() {
//   var d = new Date();
//   var n = d.toISOString();
//   document.getElementById("demo").innerHTML = n;

//   var date = new Date('2013-03-10T02:00:00Z').toLocaleString();
//    document.getElementById("demo2").innerHTML =date;

//    var d = new Date();

// document.write('Today is: ' + d.toLocaleString());

// d.setDate(d.getDate() - 5);

// document.write('<br>5 days ago was: ' + d.toLocaleString());
// }
