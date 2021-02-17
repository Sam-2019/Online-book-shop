import React from "react";
import PropTypes from "prop-types";
import { profliePhoto } from "../endpoints";
import "./profilePhoto.css";

const ProfilePhoto = ({ class_name }) => {
  return <img src={profliePhoto} alt="Avatar" className={class_name} />;
};

export default ProfilePhoto;

ProfilePhoto.propTypes = {
  class_name: PropTypes.string,
};
