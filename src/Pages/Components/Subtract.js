import React from "react";
import PropTypes from "prop-types";
import "./icons.css";

const Subtract = ({ width, height, action }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className="bi bi-dash-circle-fill"
      viewBox="0 0 16 16"
      width={width}
      height={height}
      onClick={action}
    >
      <path d="M16 8A8 8 0 110 8a8 8 0 0116 0zM4.5 7.5a.5.5 0 000 1h7a.5.5 0 000-1h-7z" />
    </svg>
  );
};

Subtract.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  action: PropTypes.func,
};

export default Subtract;
