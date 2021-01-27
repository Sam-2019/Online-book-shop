import React from "react";
import PropTypes from "prop-types";
import "./input.css";

export const Input = ({
  type,
  placeholder,
  class_name,
  value,
  action,
  click,
  uniqueID,
  uniqueName,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={class_name}
      onChange={action}
      onClick={click}
      value={value}
      id={uniqueID}
      name={uniqueName}
    />
  );
};

export const TextArea = ({
  type,
  placeholder,
  class_name,
  value,
  action,
  click,
  uniqueID,
  uniqueName,
}) => {
  return (
    <textarea
      type={type}
      placeholder={placeholder}
      className={class_name}
      onChange={action}
      onClick={click}
      value={value}
      id={uniqueID}
      name={uniqueName}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  class_name: PropTypes.string,
  value: PropTypes.string,
  action: PropTypes.func,
  click: PropTypes.func,
  uniqueID: PropTypes.number,
  uniqueName: PropTypes.string,
};

TextArea.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  class_name: PropTypes.string,
  value: PropTypes.string,
  action: PropTypes.func,
  click: PropTypes.func,
  uniqueID: PropTypes.number,
  uniqueName: PropTypes.string,
};
