import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { itemsGet, itemGet, buyerID } from "./endpoints";

const intervalMs = 10000;
  var formData = new FormData();

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

export async function productFetch(url, formData) {

  //formData.set("product_unique_id", "574ed359ce2e18.82356121");

  try {
    const response = await axios({
      method: "post",
      url: url,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
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
