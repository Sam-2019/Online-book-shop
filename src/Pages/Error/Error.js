import React from "react";
import Share from "../Components/Share";
import Back from "../Components/Back";

const ProductError = ({ children }) => {
  return (
    <div className="product-wrapper">
      <div className="header">
        <div className="category ">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2">Error</div>
        </div>

        <div className="category ">
          <div className="object-2">
            <Share width={20} height={20} />
          </div>
        </div>
      </div>

      <div className="main">
        <div className="wrapper">
          <div className="product-body">
            <div className="product-detail">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductError;
