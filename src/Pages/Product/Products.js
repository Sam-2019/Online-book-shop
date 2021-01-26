import React from "react";
import ProductsItem from "./productsItem";
import "./products.css";

const Products = () => {
  return (
    <div className="products">
      {Array(2)
        .fill()
        .map((item, index) => (
          <ProductsItem key={item} />
        ))}
    </div>
  );
};

export default Products;
