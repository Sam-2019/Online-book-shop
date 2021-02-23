import React from "react";
import StarRating from "../Components/Stars";
import ProfilePhoto from "../Components/Profile Photo";
import UserName from "../Components/UserName";
import TimeStamp from "../Components/Time Stamp";
import { profliePhoto } from "../endpoints";
import "./review.css";

const ReviewItem = () => {
  return (
    <div className=" review-wrapper">
      <div className="review-head">

        <div className="profile-image">
          <ProfilePhoto className="image" src={profliePhoto} />
        </div>


        <div className="usernameXstar">

          <div className="nameXtime">
            <UserName name="Dan Nii Tackie" />

            <TimeStamp timestamp="23 Jun 2020, 5:30 am" />
          </div>

          <StarRating value={1} type="user-rating" />
        </div>

      </div>

      <div className="review-body">
        kjgpowjewpojghoperj[j[rekhopkthrjjnglkwner]]jgpowjewpojghoperj[j[rekhopglkwner]]jgpowjewpojghoperj[j[rekhopglkwner]]jgpowjewpojghoperj[j[rekhopglkwner]]jgpowjewpojghoperj[j[rekhopglkwner]]jgpowjewpojghoperj[j[rekhopkthrjjnglkwner]]jgpowjewpojghoperj[j[rekhopkthrjjnglkwner]]
      </div>
    </div>
  );
};

export default ReviewItem;
