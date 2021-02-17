import React from "react";
import StarRating from "../Components/Stars";
import ProfilePhoto from "../Components/Profile Photo";
import UserName from "../Components/UserName";
import TimeStamp from "../Components/Time Stamp";
import "./review.css";

const ReviewItem = () => {
  return (
    <div className=' review-wrapper "'>
      <div className="review-head">
        <div className="image-nameXdate">
          <div className="object-5">
            <ProfilePhoto class_name="image" />
          </div>

          <div className="nameXdate">
            <UserName user_name="Dan Nii Tackie" />
            <TimeStamp timestamp="23 Jun 2020, 5:30 am" />
          </div>
        </div>

        <div className="stars ">
          <StarRating type="user-rating" value={1} type="user-rating" />
        </div>
      </div>

      <div className="review-body">
        kjgpowjewpojghoperj[j[rekhopkthrjjnglkwner]]jgpowjewpojghoperj[j[rekhopglkwner]]jgpowjewpojghoperj[j[rekhopglkwner]]jgpowjewpojghoperj[j[rekhopglkwner]]jgpowjewpojghoperj[j[rekhopglkwner]]jgpowjewpojghoperj[j[rekhopkthrjjnglkwner]]jgpowjewpojghoperj[j[rekhopkthrjjnglkwner]]
      </div>
    </div>
  );
};

export default ReviewItem;
