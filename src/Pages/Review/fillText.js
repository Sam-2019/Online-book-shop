import React from "react";
import PropTypes from "prop-types";

const FillText = ({ comment, toggle }) => {
  return (
    <>
      {comment}{" "}
      <span className="read-more" onClick={toggle}>
        ...less
      </span>
    </>
  );
};

export default FillText;

FillText.propTypes = {
  comment: PropTypes.string,
  toggle: PropTypes.func,
};
