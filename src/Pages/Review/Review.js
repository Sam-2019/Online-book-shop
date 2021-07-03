import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import ReviewData from "./reviewData";
import PageWrapper from "../Components/PageWrapper";
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
      <PageWrapper pageTitle="Review" wrapper="page-wrapper">
        <p className="text-3">Loading..</p>
      </PageWrapper>
    );
  }

  if (data.reviews.length === 0) {
    view = <p className="text-3">No reviews yet!</p>;
  }

  if (data.reviews.length > 0) {
    view = <ReviewData data={data.reviews} />;
  }

  return <PageWrapper pageTitle="Review">{view}</PageWrapper>;
};

export default Review;

Review.propTypes = {
  reviewData: PropTypes.array,
};
