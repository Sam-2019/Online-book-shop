import React from "react";
import PropTypes from "prop-types";
import "./icons.css";

const BackIcon = ({ width, height }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      className="bi bi-arrow-left-circle rounded"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      onClick={() => {
        window.history.back();
      }}
    >
      <path
        fillRule="evenodd"
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
      />
      <path
        fillRule="evenodd"
        d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
      />
    </svg>
  );
};

export default BackIcon;

BackIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
{
  /* <svg xmlns="http://www.w3.org/2000/svg"    width={width}
      height={height} fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16"       onClick={() => {
        window.history.back();
      }}>
<path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg> */
}
