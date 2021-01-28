import React from "react";
import Success from "./Success";
import "./success.scss";

const SuccessWrapper = ({ children }) => {
  return (
    <div className="success-wrapper">
      <div className="success-item ">
        <Success />
        {children}
      </div>
    </div>
  );
};

export default SuccessWrapper;

SuccessWrapper.propTypes = {};
