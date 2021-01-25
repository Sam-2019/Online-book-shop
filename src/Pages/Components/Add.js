import React from "react";
import PropTypes from "prop-types";
import "./icons.css";

const Add = ({ width, height, action }) => {
  return (
    <svg
      fill="currentColor"
      className="bi bi-circle-fill "
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      onClick={action}
    >
      <path d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4.5a.5.5 0 00-1 0v3h-3a.5.5 0 000 1h3v3a.5.5 0 001 0v-3h3a.5.5 0 000-1h-3v-3z" />
    </svg>
  );
};

export default Add;

Add.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  action: PropTypes.func,
};
