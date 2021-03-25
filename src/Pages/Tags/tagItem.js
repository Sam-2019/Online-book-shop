import React from "react";
import { useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";

const TagItem = ({ id, title, toggle }) => {
  let history = useHistory();
  const queryClient = useQueryClient();

  function Toggle() {
    toggle();
    history.push(`/tag/${title}`);
    queryClient.invalidateQueries("tagContent");
  }
  return (
    <button className="selected" onClick={Toggle}>
      {title}
    </button>
  );
};

export default TagItem;
