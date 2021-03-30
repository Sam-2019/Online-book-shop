import React from "react";
import Back from "../Components/Back";
import ReviewItem from "./reviewItem";
import { reviewData } from "./reviewData";
import "./review.css";

const Review = () => {
  return (
    <div className="page-wrapper">
      <div className="header">
        <div className="category">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2">Review ({reviewData.length})</div>
        </div>
      </div>

      <div className="main">
        <div className=" wrapper-item">
          {reviewData.map((item, index) => (
            <ReviewItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
