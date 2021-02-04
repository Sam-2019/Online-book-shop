import React from "react";
import PropTypes from "prop-types";
import Button from "../Components/Button";
import "./confirm.css";

const Confirm = ({ close, children, primary, secondary }) => {
  return (
    <div className="popup-wrapper">
      <div className="confirm">
        <div className="confirm-delete">{children}</div>

        <Button class_name="primary" name={primary} />
        <Button class_name="secondary" name={secondary} action={close} />
      </div>
    </div>
  );
};

export default Confirm;

Confirm.propTypes = {
  close: PropTypes.func,
};
