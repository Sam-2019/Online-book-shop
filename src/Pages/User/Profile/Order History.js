import React from "react";
import OrderItem from "./order-item";

import Back from "../../Components/Back";

const OrderHistory = () => {
  return (
    <div className="user-wrapper">
      <div className="header">
        <div className="category">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2"> Orders (1)</div>
        </div>

    
      </div>

      <div className="main">
 

        {Array(8)
          .fill()
          .map((item, index) => (
            <OrderItem key={index} />
          ))}
      </div>
    </div>
  );
};

export default OrderHistory;
