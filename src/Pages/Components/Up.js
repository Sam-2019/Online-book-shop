import React from "react";
import PropTypes from "prop-types";
import "./icons.css";

const Up = ({ width, height, action }) => {
  return (
    <svg
      fill="currentColor"
      className="bi bi-chevron-up"
      viewBox="0 0 16 16"
      id="chevron-up"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      onClick={action}
    >
      <path
        fillRule="evenodd"
        d="M7.646 4.646a.5.5 0 01.708 0l6 6a.5.5 0 01-.708.708L8 5.707l-5.646 5.647a.5.5 0 01-.708-.708l6-6z"
      />
    </svg>
  );
};

export default Up;

Up.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  action: PropTypes.func,
};
