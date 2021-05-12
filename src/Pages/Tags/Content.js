import React from "react";

import { useParams } from "react-router-dom";
import Back from "../Components/Back";
import Placeholder from "../Placeholders/Products";
import ProductsItem from "../Product/productsItem";

const Content = () => {
  let { id } = useParams();

  return (
    <div className="search-wrapper ">
      <div className="header">
        <div className="category">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2"></div>
        </div>
      </div>

      <div className="main">
        <Placeholder />
      </div>
    </div>
  );
};
export default Content;
