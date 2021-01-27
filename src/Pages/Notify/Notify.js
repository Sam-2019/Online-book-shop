import React from "react";
import PropTypes from "prop-types";
import Close from "../Components/Close";
import "./notify.css";

const Notify = ({ message, close }) => {
  return (
    <div className="notify-wrapper ">
    <div className="notify ">
      {/* <div className="notify-close ">
        <Close width={25} height={25} action={close} />
      </div> */}

      <div className="notify-main  ">{message}</div>
    </div>
    </div>
  );
};

export default Notify;

Notify.propTypes = {
  message: PropTypes.string,
};
