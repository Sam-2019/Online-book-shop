import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Back from "../Components/Back";
import ReviewData from "./reviewData";

import { useQuery } from "@apollo/client";
import { GET_PRODUCT_REVIEWS } from "../graphQL functions";
import "./review.css";

const Review = () => {
  let { sku } = useParams();

  const { loading, error, data } = useQuery(GET_PRODUCT_REVIEWS, {
    variables: { sku },
  });

  let view;

  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="header">
          <div className="category">
            <div className="object-1">
              <Back width={30} height={30} />
            </div>
            <div className="object-2">Review</div>
          </div>
        </div>

        <div className="main">
          <div className=" wrapper-item">Loading...</div>
        </div>
      </div>
    );
  }

  if (data.reviews.length === 0) {
    view = <p className="text-3">No reviews yet!</p>;
  }

  if (data.reviews.length > 0) {
    view = <ReviewData data={data.reviews} />;
  }

  return (
    <div className="page-wrapper">
      <div className="header">
        <div className="category">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2">Review</div>
        </div>
      </div>

      <div className="main">
        <div className=" wrapper-item">{view}</div>
      </div>
    </div>
  );
};

export default Review;

Review.propTypes = {
  reviewData: PropTypes.array,
};
