import React from 'react'
import OrderItem from "./order-item";

const historyData = ({ data }) => {
    return (
      <>
        {data.map((items, i) => (
          <OrderItem key={i} {...items} />
        ))}
      </>
    );
  };
  

export default historyData
