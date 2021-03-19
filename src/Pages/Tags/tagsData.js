import React from "react";
import TagItem from "./tagItem";

const TagData = ({ data, toggle }) => {
  return (
    <>
      {data.map((items, index) => (
        <TagItem key={index} {...items} toggle={toggle} />
      ))}
    </>
  );
};

export default TagData;
