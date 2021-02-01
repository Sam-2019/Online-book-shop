import React from "react";
import PropTypes from "prop-types";
import Star from "./Star";
import "./star.css";

const Stars = ({ totalStars = 5, value, type }) => {
  return (
    <div className="stars">
      <span className="star-text">{type === "user-rating" ? null : value}</span>
      {[...Array(totalStars)].map((n, i) => (
        <Star key={i} selected={i < value} type={type} width={20} height={20} />
      ))}
    </div>
  );
};

Stars.propTypes = {
  totalStars: PropTypes.number,
  value: PropTypes.number,
  value2: PropTypes.number,
};

export default Stars;

// const Star2 = ({ selected = false }) => (
//   <div className={selected ? "star selected " : "star"}></div>
// );

// Star2.propTypes = {
//   selected: PropTypes.bool,
// };
