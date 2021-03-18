import React from "react";
import WishItem from "./wish-item";

const wishData = ({ data }) => {
  return (
    <>
      {data.map((items, i) => (
        <WishItem key={i} {...items} />
      ))}
    </>
  );
};

export default wishData;
