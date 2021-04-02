import React from "react";
import PropTypes from "prop-types";

const UserName = ({ name }) => {
  return <div className="user-name">{name}</div>;
};

export default UserName;

UserName.propTypes = {
  name: PropTypes.string,
};
