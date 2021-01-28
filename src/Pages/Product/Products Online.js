import React from "react";
import { useProducts } from "../helper";
import ProductsItem from "./productsItem";
import "./products.css";

const Products = () => {
  const { isLoading, data, error } = useProducts();

  console.log(data);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred: " +{error.message}</div>;

  return (
    <>
      {data.map((products, i) => (
        <ProductsItem key={i} {...products} />
      ))}
    </>
  );
};

export default Products;
