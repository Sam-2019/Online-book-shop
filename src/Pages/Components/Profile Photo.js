import React from "react";
import { useData } from "../Context";
import "./profilePhoto.css";

const ProfilePhoto = () => {
  const { profileImage } = useData();

  return <img className="image" src={profileImage} alt="img" />;
};

export default ProfilePhoto;