import React from "react";
import PropTypes from "prop-types";
import Close from "../Components/Close";
import "./notify.css";

const Notify = ({ message }) => {
  return (
    <div className="notify">
      <div className="notify-close">
        <Close width="15" height="15" action />
      </div>

      <div className="notify-main ">{message}</div>
    </div>
  );
};

export default Notify;

Notify.propTypes = {
  message: PropTypes.string,
};
