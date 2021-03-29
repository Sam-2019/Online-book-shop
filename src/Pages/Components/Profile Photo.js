import React from "react";

import "./profilePhoto.css";

const ProfilePhoto = ({ ...restProps }) => {
  return <img alt="img" {...restProps} />;
};
export default ProfilePhoto;