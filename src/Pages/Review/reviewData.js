import React, {Fragment} from "react";
import ReviewItem from "./reviewItem";

const ReviewData = ({ data }) => {
  return (
    <Fragment>
      {data.map((item, i) => (
        <ReviewItem {...item} key={i} />
      ))}
    </Fragment>
  );
};

export default ReviewData;
