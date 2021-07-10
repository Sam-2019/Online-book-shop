import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ORDER } from "../../graphQL functions";

import HistoryData from "./historyData";

import EmptyOrderHistory from "../../SVGs/empty-orderhistory";
import SVGContainer from "../../SVGs/SVGcontainer";
import PageWrapper from "../../Components/PageWrapper";

const OrderHistory = () => {
  const { loading, data } = useQuery(GET_ORDER);

  //trese
  //rurouni kenshin
  //mortal combat
  //shadow and bones
  //nevers

  let view;

  if (loading || data.userOrder.length === 0) {
    return (
      <PageWrapper pageTitle="Orders" wrapper="user-wrapper">
        <div className="wrapper-item">
          <SVGContainer>
            <EmptyOrderHistory />
            <p className="text-3">
              No item in <b>your</b> order history yet!
            </p>
          </SVGContainer>
        </div>
      </PageWrapper>
    );
  }

  if (data.userOrder.length > 0) {
    view = <HistoryData data={data.userOrder} />;
  }

  return (
    <PageWrapper pageTitle="Orders" wrapper="user-wrapper">
      {view}
    </PageWrapper>
  );
};

export default OrderHistory;
