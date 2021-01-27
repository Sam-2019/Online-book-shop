import React from "react";
import { useLocation } from "react-router-dom";
import Back from "../Components/Back";

import Products from "../Product/Products";
import "./search.css";

const Search = () => {
  let query = new URLSearchParams(useLocation().search).get("q");
  return (
    <div className="search-wrapper ">
      <div className="header ">
        <div className="category">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2"> Search</div>
        </div>
      </div>

      <div className="main ">
        <div className="title-makeshift ">Search Results for "{query}"</div>
        <div className="products ">
        <Products />
      </div>
      </div>
    </div>
  );
};

export default Search;
