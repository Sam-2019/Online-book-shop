import React, {Fragment} from "react";
import OrderItem from "./order-item";

const HistoryData = ({ data }) => {

  return (
    <Fragment>
  {data.map((item, i) => (
        <OrderItem {...item} key={i} />
      ))} 
    </Fragment>
  );
};

export default HistoryData;
