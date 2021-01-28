import React, { useState } from "react";
import PropTypes from "prop-types";
import "./star.css";

const StarRating = ({ totalStars = 5 }) => {
  const [starsSelected, setStarsSelected] = useState(0);

  return (
    <div className="star-rating">
      <div className="helloguys">
        {[...Array(totalStars)].map((n, i) => (
          <Star
            key={i}
            selected={i < starsSelected}
            onClick={() => setStarsSelected(i + 1)}
          />
        ))}
      </div>

      <div className="star-text1 ">
        {starsSelected > 0 ? `${starsSelected} stars` : null}
      </div>
    </div>
  );
};

StarRating.propTypes = {
  totalStars: PropTypes.number,
};

export default StarRating;

const Star = ({ selected = false, onClick = (f) => f }) => (
  <div className={selected ? "star selected" : "star"} onClick={onClick}></div>
);

Star.propTypes = {
  selected: PropTypes.bool,
  onClick: PropTypes.func,
};
