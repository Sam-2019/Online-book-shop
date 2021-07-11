import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../graphQL functions";

import Placeholder from "../Placeholders/Product";
import ProductData from "./productData";
import Error from "../Error/Error";

import "./product.css";

const Product = () => {
  let { sku } = useParams();

  const { loading, error, data,refetch } = useQuery(GET_PRODUCT, {
    variables: { sku: sku },
  });

  if (loading) return <Placeholder />;
  if (error) return <Error>{`Error! ${error}`}</Error>;

  return <ProductData results={data.product} refetch={refetch} />;
};

export default Product;
