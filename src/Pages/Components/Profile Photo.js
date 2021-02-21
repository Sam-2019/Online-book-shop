import React from "react";
import PropTypes from "prop-types";
import "./profilePhoto.css";

const ProfilePhoto = ({ ...restProps }) => {
  return <img alt="img" {...restProps} />;
};

export default ProfilePhoto;

ProfilePhoto.propTypes = {

};
