import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const TagItem = ({ toggle }) => {
  let history = useHistory();

  function Toggle() {
    toggle();
  }
  return (
    <button className="selected" onClick={Toggle}>
      Hello
    </button>
  );
};

export default TagItem;

TagItem.propTypes = {};
