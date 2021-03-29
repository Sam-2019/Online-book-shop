import React from "react";
import { useData } from "../Context";

const UserName = () => {
  const { firstName, lastName } = useData();
  return <div className="user-name">{`${firstName} ${lastName}`}</div>;
};

export default UserName;
