import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Star from "./Star";
import "./star.css";

const StarRatings = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 6px;

  @media (max-width: 540px) {
  }

  @media (max-width: 530px) {
  }
`;

const StarRatingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 250px;
  padding: 10px;

  @media (max-width: 540px) {
    width: 300px;
  }

  @media (max-width: 530px) {
  }
`;

const StarRating = ({ totalStars = 5 }) => {
  const [starsSelected, setStarsSelected] = useState(0);
  let state;

  switch (starsSelected) {
    case 0:
      state = "";
      break;
    case 1:
      state = "star";
      break;
    default:
      state = "stars";
  }

  return (
    <StarRatings>
      <StarRatingWrapper>
        {[...Array(totalStars)].map((n, i) => (
          <Star
            key={i}
            selected={i < starsSelected}
            action={() => setStarsSelected(i + 1)}
            width={25}
            height={25}
          />
        ))}
      </StarRatingWrapper>

      {/* <div className="star-text1 ">
        {starsSelected > 0 ? `${starsSelected} ${state}` : null}
      </div> */}
    </StarRatings>
  );
};

StarRating.propTypes = {
  totalStars: PropTypes.number,
};

export default StarRating;
