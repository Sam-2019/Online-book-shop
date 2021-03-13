import React from "react";
import StarRating from "../Components/Stars";
import ProfilePhoto from "../Components/Profile Photo";
import UserName from "../Components/UserName";
import TimeStamp from "../Components/Time Stamp";

import "./review.css";

const ReviewItem = ({ picture, name, time_stamp, rating, comment }) => {
  var date = new Date(time_stamp).toLocaleString();

  return (
    <div className=" review-wrapper">
      <div className="review-head">
        <div className="profile-image">
          <ProfilePhoto className="image" src={picture} />
        </div>

        <div className="usernameXstar ">
          <div className="nameXtime">
            <UserName name={name} />

            <TimeStamp timestamp={date} />

            <StarRating value={Number(rating)} type="user-rating" />
          </div>
        </div>
      </div>

      <div className="review-body">{comment} </div>
    </div>
  );
};

export default ReviewItem;
