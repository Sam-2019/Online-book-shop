import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { itemGet } from "../endpoints";
import Placeholder from "../Placeholders/Product";
import ProductData from "./productData";

import "./product.css";

const Product = () => {
  let { id } = useParams();
  var formData = new FormData();
  formData.set("product_unique_id", id);

  const { isLoading, error, data, isFetching } = useQuery(["product"], () =>
    fetch(itemGet, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      })
  );

  return <>{isLoading ? <Placeholder /> : <ProductData data={data} />}</>;
};

export default Product;
