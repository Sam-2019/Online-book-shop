import React from "react";
import PropTypes from "prop-types";
import "./icons.css";

const Justify = ({ width, height, action }) => {
  return (
    <svg
      fill="currentColor"
      className="bi bi-justify"
      viewBox="0 0 16 16"
      id="justify"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      onClick={action}
    >
      <path
        fillRule="evenodd"
        d="M2 12.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z"
      />
    </svg>
  );
};

export default Justify;

Justify.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  action: PropTypes.func,
};
