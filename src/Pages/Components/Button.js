import React from "react";
import PropTypes from "prop-types";
import "./button.css";

const Button = ({ class_name, action, name, loading }) => {
  let loadingView;

  switch (loading && class_name) {
    case "primary":
      loadingView = "loadingView";
      break;
    case "secondary":
      loadingView = "loadingView";
      break;
    case "header-primary":
      loadingView = "loadingView";
      break;
    case "header-primary2":
      loadingView = "loadingView";
      break;
    case "header-secondary":
      loadingView = "loadingView";
      break;
    case "cancel-order":
      loadingView = "loadingView";
      break;
    case "whatsapp":
      loadingView = "loadingView";
      break;
    case "facebook":
      loadingView = "loadingView";
      break;
    case "twitter":
      loadingView = "loadingView";
      break;
    case "checkout":
      loadingView = "loadingView";
      break;
    case "addCart":
      loadingView = "loadingView";
      break;
    case "buyNow":
      loadingView = "loadingView";
      break;
  }

  return (
    <button className={class_name} onClick={action} disabled={loading}>
      {loading ? "Loading..." : <>{name}</>}
    </button>
  );
};

export default Button;

Button.propTypes = {
  class_name: PropTypes.string,
  name: PropTypes.string,
  action: PropTypes.func,
};
