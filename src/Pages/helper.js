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
  console.log(data);
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
