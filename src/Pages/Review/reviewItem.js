import React from "react";
import StarRating from "../Components/Stars";
import ProfilePhoto from "../Components/Profile Photo";
import UserName from "../Components/UserName";
import TimeStamp from "../Components/Time Stamp";

import "./review.css";

const ReviewItem = ({ picture, name, time_stamp, rating, comment }) => {
  const [contractDescription, expandDescription] = React.useState(true);

  var date = new Date(time_stamp).toLocaleString();

  const ToggleDescription = () => {
    expandDescription(!contractDescription);
  };

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

      <div>
        <span
          className={contractDescription ? "review-body" : "review-body-morel"}
        >
          {comment}
        </span><span onClick={ToggleDescription} className='read-more'>
        {contractDescription ? "read more" : ""}
      </span>
      </div>
  
    </div>
  );
};

export default ReviewItem;
