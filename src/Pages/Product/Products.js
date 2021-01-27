import React from "react";
import ProductsItem from "./productsItem";
import "./products.css";

const Products = () => {
  return (
    <>
      {Array(10)
        .fill()
        .map((item, index) => (
          <ProductsItem key={index} index={index} />
        ))}
    </>
  );
};

export default Products;
