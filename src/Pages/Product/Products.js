import React from "react";
import ProductsItem from "./productsItem";
import "./products.css";

const Products = () => {
  return (
    <div className="products">
      {Array(10)
        .fill()
        .map((item, index) => (
          <ProductsItem key={index} index={index} />
        ))}
    </div>
  );
};

export default Products;
