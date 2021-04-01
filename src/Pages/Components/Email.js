import React from "react";
import { useData } from "../Context";

const Email = () => {
  const { email } = useData();
  return <div className="user-name">{email}</div>;
};

export default Email;
