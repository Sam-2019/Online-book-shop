import React from "react";
import Back from "../../Components/Back";
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

  if (loading) {
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

  if (data.userOrder.length === 0) {
    view = (
      <SVGContainer>
        <EmptyOrderHistory />
        <p className="text-3">
          No item in <b>your</b> order history yet!
        </p>
      </SVGContainer>
    );
  }

  if (data.userOrder.length > 0) {
    view = <HistoryData data={data.userOrder} />;
  }

  return (
    <div className="user-wrapper">
      <div className="header">
        <div className="category">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2"> Orders ({data.userOrder.length})</div>
        </div>
      </div>

      <div className="main">
        <div className="wrapper-item">{view}</div>
      </div>
    </div>
  );
};

export default OrderHistory;
