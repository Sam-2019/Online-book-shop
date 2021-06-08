import React from "react";
import OrderItem from "./order-item";

const HistoryData = ({ data }) => {

  return (
    <>
  {data.map((item, i) => (
        <OrderItem {...item} key={i} />
      ))} 
    </>
  );
};

export default HistoryData;
