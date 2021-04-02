import React from "react";
import StarRating from "../Components/Stars";
import ProfilePhoto from "../Components/Profile Photo";
import UserName from "../Components/UserName";
import TimeStamp from "../Components/Time Stamp";
import { MediaQuery } from "../helper";

import "./review.css";

const ReviewItem = () => {
  return (
    <div className=" review-wrapper">
      <div className="review-head">
        <div className="profile-image">
          <ProfilePhoto
            className="image"
            src="https://via.placeholder.com/150?text=Okukus.com"
          />
        </div>

        <div className="usernameXstar ">
          <div className="nameXtime">
            <div className="nameDate">
              <UserName name="Loading" />

              <TimeStamp timestamp="Loading" />
            </div>

            <StarRating value={0} type="user-rating" />
          </div>
        </div>
      </div>

      <div>
        <span>Loading...</span>
      </div>
    </div>
  );
};
const Mobile = () => {
  return (
    <>
      {Array(3)
        .fill()
        .map((item, index) => (
          <ReviewItem key={index} />
        ))}
    </>
  );
};

const Desktop = () => {
  return (
    <>
      {Array(6)
        .fill()
        .map((item, index) => (
          <ReviewItem key={index} />
        ))}
    </>
  );
};

const Placeholder = () => {
  const { width } = MediaQuery();

  return <div>{width > 540 ? <Desktop /> : <Mobile />}</div>;
};


export default Placeholder;
