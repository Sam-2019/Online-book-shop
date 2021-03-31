import React from "react";
import PropTypes from "prop-types";
import TagItem from "./tagItem";

const TagData = ({ data, toggle }) => {
  return (
    <>
      {data.map((items, index) => (
        <TagItem key={index} {...items} toggle={toggle} />
      ))}
    </>
  );
};

export default TagData;

TagData.propTypes = {
  toggle: PropTypes.func,
  data: PropTypes.array,
};
