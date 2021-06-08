import React from "react";
import WishItem from "./wish-item";

const wishData = ({ data, refetch }) => {
  return (
    <>
      {data.map((data, i) => (
        <WishItem {...data} key={i} refetch={refetch} />
      ))}
    </>
  );
};

export default wishData;
