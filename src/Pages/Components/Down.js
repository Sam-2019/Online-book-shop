import React from "react";
import PropTypes from "prop-types";
import "./icons.css";

const Down = ({ width, height, action }) => {
  return (
    <svg
      fill="currentColor"
      className="bi bi-chevron-down"
      viewBox="0 0 16 16"
      id="chevron-down"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      onClick={action}
    >
      <path
        fillRule="evenodd"
        d="M1.646 4.646a.5.5 0 01.708 0L8 10.293l5.646-5.647a.5.5 0 01.708.708l-6 6a.5.5 0 01-.708 0l-6-6a.5.5 0 010-.708z"
      />
    </svg>
  );
};

export default Down;


Down.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  action: PropTypes.func,
};