import React from "react";
import OrderItem from "./order-item";

const historyData = ({ data }) => {
  return (
    <>
      {data.map((data, i) => (
        <OrderItem {...data} key={i} />
      ))}
    </>
  );
};

export default historyData;
