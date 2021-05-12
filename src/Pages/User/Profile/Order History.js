import React from "react";
import Back from "../../Components/Back";

import EmptyOrderHistory from "../../SVGs/empty-orderhistory";
import SVGContainer from "../../SVGs/SVGcontainer";

const OrderHistory = () => {
  return (
    <div className="user-wrapper">
      <div className="header">
        <div className="category">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2"> Orders (100)</div>
        </div>
      </div>

      <div className="main">
        <div className="wrapper-item">
          <SVGContainer>
            <EmptyOrderHistory />
            <p className="text-3">
              No item in <b>your</b> order history yet!
            </p>
          </SVGContainer>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
