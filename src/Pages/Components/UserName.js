import React from "react";
import PropTypes from "prop-types";

const UserName = ({ user_name }) => {
  return <div className="user-name">{user_name}</div>;
};

export default UserName;

UserName.propTypes = {
  user_name: PropTypes.string,
};
