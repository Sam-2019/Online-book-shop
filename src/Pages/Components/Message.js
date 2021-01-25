import React from "react";
import PropTypes from "prop-types";

const Message = ({ class_name, message }) => {
  return <div className={class_name}>{message}</div>;
};

export default Message;

Message.propTypes = {
  class_name: PropTypes.string,
  message: PropTypes.string,
};
