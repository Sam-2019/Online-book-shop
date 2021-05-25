import React from "react";
import ReviewItem from "./reviewItem";

const ReviewData = ({ data }) => {
  return (
    <>
      {data.map((item, i) => (
        <ReviewItem {...item} key={i} />
      ))}
    </>
  );
};

export default ReviewData;
