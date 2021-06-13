import React ,{Fragment}from "react";
import PropTypes from "prop-types";
import StarRating from "../Components/Stars";
import ProfilePhoto from "../Components/Profile Photo";
import UserName from "../Components/UserName";
import TimeStamp from "../Components/Time Stamp";
import FillText from "./fillText";

import "./review.css";

const ReviewItem = ({ id, rating, text, created_at, user }) => {
  var date = new Date(Number(created_at)).toLocaleString();

  const [fullText, setFullTest] = React.useState(false);

  const toggle = () => {
    setFullTest(!fullText);
  };

  return (
    <div className=" review-wrapper">
      <div className="review-head ">
        <div className="profile-image">
          <ProfilePhoto className="image" src={user.photoURL} />
        </div>

        <div className="usernameXstar ">
          <div className="nameXtime">
            <div className="nameDate">
              <UserName name={`${user.first_name} ${user.last_name}`} />

              <TimeStamp timestamp={date} />
            </div>

            <StarRating value={Number(rating)} type="user-rating" />
          </div>
        </div>
      </div>

      {text.length > 150 ? (
        <Fragment>
          {fullText ? (
            <FillText comment={text} toggle={toggle} />
          ) : (
            <Fragment>
              {text.substr(0, 218)}{" "}
              <span className="read-more" onClick={toggle}>
                ...more
              </span>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <Fragment> {text} </Fragment>
      )}

      <div>
        <span></span>
      </div>
    </div>
  );
};

export default ReviewItem;

ReviewItem.propTypes = {
  text: PropTypes.string,
  user: PropTypes.object,
  name: PropTypes.string,
  created_at: PropTypes.string,
  rating: PropTypes.number,
};
