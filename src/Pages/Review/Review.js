import React from "react";
import Back from "../Components/Back";
import ReviewItem from "./reviewItem";
import { data } from "./reviewData";
import "./review.css";

const Review = () => {
  return (
    <div className="page-wrapper">
      <div className="header">
        <div className="category">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2">Review ({data.length})</div>
        </div>
      </div>

      <div className="main">
        <div className=" wrapper-item">
          {data.map((item, index) => (
            <ReviewItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
