import React from "react";
import { useQuery } from "react-query";
import Back from "../../Components/Back";
import { buyerID, orderHistory } from "../../endpoints";
import { backendData } from "../../helper";
import { useData } from "../../Context";
import EmptyOrderHistory from "../../SVGs/empty-orderhistory";
import SVGContainer from "../../SVGs/SVGcontainer";
import HistoryData from "./historyData";

const OrderHistory = () => {
  const { orderLength } = useData();
  var formData = new FormData();
  formData.set("buyer_unique_id", buyerID);

  const { data } = useQuery(
    ["orderHistory", orderHistory, formData],
    () => backendData(orderHistory, formData),
    {
      keepPreviousData: true,
      staleTime: 5000,
      cacheTime: 5000,
    }
  );

  return (
    <div className="user-wrapper">
      <div className="header">
        <div className="category">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2"> Orders ({orderLength})</div>
        </div>
      </div>

      <div className="main">
        <div className="wrapper-item">
          {data === undefined ? (
            <SVGContainer>
              <EmptyOrderHistory />
              <p className="text-3">
                No item in <b>your</b> order history yet!
              </p>
            </SVGContainer>
          ) : null}

          {data ? <HistoryData data={data} /> : null}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
