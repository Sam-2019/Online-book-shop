import React from "react";
import PropTypes from "prop-types";
import "./icons.css";

const Right = ({ width, height, action }) => {
  return (
    <svg
      fill="currentColor"
      className="bi bi-chevron-right"
      viewBox="0 0 16 16"
      id="chevron-right"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      onClick={action}
    >
      <path
        fillRule="evenodd"
        d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"
      />
    </svg>
  );
};

export default Right;

Right.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  action: PropTypes.func,
};
