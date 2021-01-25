import React from "react";
import PropTypes from "prop-types";
import "./button.css";

const Button = ({ class_name, action, name }) => {
  return (
    <button className={class_name} onClick={action}>
      {name}
    </button>
  );
};

export default Button;


Button.propTypes = {
  class_name: PropTypes.string,
  name: PropTypes.string,
  action: PropTypes.func,
};