import React from "react";
import PropTypes from "prop-types";

const Notify = ({ class_name, message }) => {
  return <div className={class_name}>{message}</div>;
};

export default Notify;

Notify.propTypes = {
  class_name: PropTypes.string,
  message: PropTypes.string,
};
