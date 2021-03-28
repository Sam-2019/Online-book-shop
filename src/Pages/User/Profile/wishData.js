import React from "react";
import WishItem from "./wish-item";

const wishData = ({ data }) => {
  return (
    <>
      {data.map((data, i) => (
        <WishItem {...data} key={i} />
      ))}
    </>
  );
};

export default wishData;
