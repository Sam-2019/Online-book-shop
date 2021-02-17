import React from "react";
import PropTypes from "prop-types";

const TimeStamp = ({ timestamp }) => {
  return <div className="dateXtime">{timestamp}</div>;
};

export default TimeStamp;

TimeStamp.propTypes = {
    timestamp: PropTypes.string,
  };
  