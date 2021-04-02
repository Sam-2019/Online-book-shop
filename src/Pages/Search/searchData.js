import React from "react";
import PropTypes from "prop-types";
import ProductsItem from '../Product/productsItem'

const SearchData = ({ data }) => {
  return (
    <div className="products">
      {data.map((items, index) => (
        <ProductsItem key={index} {...items} />
      ))}
    </div>
  );
};

export default SearchData;

SearchData.propTypes = {
  data: PropTypes.array,
};
