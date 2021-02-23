import React from "react";
import PropTypes from "prop-types";
import Star from "./Star";
import "./star.css";

const Stars = ({ totalStars = 5, value, type }) => {
  return (
    <div className="stars">
      <span className="star-text">{type === "user-rating" ? null : null}</span>
      {[...Array(totalStars)].map((n, i) => (
        <Star key={i} selected={i < value} type={type} width={20} height={20} />
      ))}
    </div>
  );
};

Stars.propTypes = {
  totalStars: PropTypes.number,
  value: PropTypes.number,
  type: PropTypes.string,
};

export default Stars;