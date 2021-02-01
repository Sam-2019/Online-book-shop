import React from "react";
import PropTypes from "prop-types";
import "./star.css";

const Star = ({ type, width, height, selected = false, action = (f) => f }) => {
  let ratingType;

  return (
    <svg
      fill="currentColor"
      className={selected ? "bi bi-star-filled" : "bi bi-star-fill "}
      viewBox="0 0 16 16"
      id="star-fill"
      xmlns="http://www.w3.org/2000/svg"
      width={type === "user-rating" ? 14 : width}
      height={type === "user-rating" ? 14 : height}
      onClick={action}
    >
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
    </svg>
  );
};

Star.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  type: PropTypes.string,
};

export default Star;
