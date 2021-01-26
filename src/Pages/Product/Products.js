import React from "react";
import { useProducts } from "../helper";
import ProductsItem from "./productsItem";
import "./products.css";

const Products = () => {
  const { isLoading, data, error } = useProducts();

  console.log(data);

  if (isLoading) return <div className="products">Loading...</div>;

  if (error)
    return (
      <div className="products">An error has occurred: " +{error.message}</div>
    );

  return (
    <div className="products">
      {Array(1)
        .fill()
        .map((item, index) => (
          <ProductsItem key={index} />
        ))}

      {data.map((products, i) => (
        <ProductsItem key={i} {...products} />
      ))}
    </div>
  );
};

export default Products;
