import React from "react";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "../graphQL functions";

import Placeholder from "../Placeholders/Product";
import ProductData from "./productData";

import "./product.css";

const Product = () => {
  let history = useHistory();
  let { sku } = useParams();
  let { url } = useRouteMatch();

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { sku },
  });

  if (loading) return <Placeholder />;
  if (error) return `Error! ${error}`;

  return <ProductData results={data.product} />;
};

export default Product;
