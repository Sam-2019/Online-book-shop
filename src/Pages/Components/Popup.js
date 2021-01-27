import React from "react";
import PropTypes from "prop-types";
import Button from "../Components/Button";
import Close from "../Components/Close";
import "./popup.css";

const PopUp = ({ children, close }) => {
  return (
    <div className="popup-wrapper">
      <div className="popup">
        <div className="close-button">
          <Close width="30" height="30" />
        </div>

        <div>{children}</div>
        <Button class_name="primary" name="Okay" />
        <Button class_name="secondary" name="Close" action={close} />
      </div>
    </div>
  );
};

export default PopUp;

PopUp.propTypes = {
  close: PropTypes.func,
  children: PropTypes.element.isRequired,
};
