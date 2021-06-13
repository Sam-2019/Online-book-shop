import React, {Fragment} from "react";
import PropTypes from "prop-types";

const FillText = ({ comment, toggle }) => {
  return (
    <Fragment>
      {comment}{" "}
      <span className="read-more" onClick={toggle}>
        ...less
      </span>
    </Fragment>
  );
};

export default FillText;

FillText.propTypes = {
  comment: PropTypes.string,
  toggle: PropTypes.func,
};
