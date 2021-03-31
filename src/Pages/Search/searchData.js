import React from "react";
import PropTypes from "prop-types";
import SearchItem from "./searchItem";

const SearchData = ({ data }) => {
  return (
    <div className="products">
      {data.map((items, index) => (
        <SearchItem key={index} {...items} />
      ))}
    </div>
  );
};

export default SearchData;

SearchData.propTypes = {
  data: PropTypes.array,
};
