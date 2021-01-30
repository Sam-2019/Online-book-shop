import React from "react";
import PropTypes from "prop-types";
import Star from "./Star";
import "./star.css";

const Stars = ({ totalStars = 5, value }) => {
  return (
    <div className="stars">
      <span className="star-text">{value} </span>
      {[...Array(totalStars)].map((n, i) => (
        <Star key={i} selected={i < value} />
      ))}
    </div>
  );
};

Stars.propTypes = {
  totalStars: PropTypes.number,
  value: PropTypes.number,
};

export default Stars;

// const Star2 = ({ selected = false }) => (
//   <div className={selected ? "star selected " : "star"}></div>
// );

// Star2.propTypes = {
//   selected: PropTypes.bool,
// };
