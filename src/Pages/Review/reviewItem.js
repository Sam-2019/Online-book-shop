import React from "react";
import PropTypes from "prop-types";
import StarRating from "../Components/Stars";
import ProfilePhoto from "../Components/Profile Photo";
import UserName from "../Components/UserName";
import TimeStamp from "../Components/Time Stamp";
import FillText from "./fillText";

import "./review.css";

const ReviewItem = ({ picture, name, time_stamp, rating, comment }) => {
  var date = new Date(time_stamp).toLocaleString();

  const [fullText, setFullTest] = React.useState(false);

  const toggle = () => {
    setFullTest(!fullText);
  };

  return (
    <div className=" review-wrapper">
      <div className="review-head ">
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

      {comment.length > 150 ? (
        <>
          {fullText ? (
            <FillText comment={comment} toggle={toggle} />
          ) : (
            <>
              {comment.substr(0, 218)}{" "}
              <span className="read-more" onClick={toggle}>
                ...more
              </span>
            </>
          )}
        </>
      ) : (
        <> {comment} </>
      )}

      <div>
        <span></span>
      </div>
    </div>
  );
};

export default ReviewItem;

ReviewItem.propTypes = {
  comment: PropTypes.string,
  picture: PropTypes.string,
  name: PropTypes.string,
  time_stamp: PropTypes.string,
  rating: PropTypes.string,
};
