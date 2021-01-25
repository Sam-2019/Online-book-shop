import React from "react";
import PropTypes from "prop-types";
import "./icons.css";

const Bag = ({ width, height, action }) => {
  return (
    <svg
      fill="currentColor"
      class="bi bi-bag"
      viewBox="0 0 16 16"
      id="bag"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      onClick={action}
    >
      <path d="M8 1a2.5 2.5 0 012.5 2.5V4h-5v-.5A2.5 2.5 0 018 1zm3.5 3v-.5a3.5 3.5 0 10-7 0V4H1v10a2 2 0 002 2h10a2 2 0 002-2V4h-3.5zM2 5h12v9a1 1 0 01-1 1H3a1 1 0 01-1-1V5z" />
    </svg>
  );
};

export default Bag;

Bag.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  action: PropTypes.func,
};
