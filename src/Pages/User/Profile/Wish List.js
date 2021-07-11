import React from "react";
import { useQuery } from "@apollo/client";
import WishData from "./wishData";
import Back from "../../Components/Back";
import EmptyWishList from "../../SVGs/empty-wishlist";
import SVGContainer from "../../SVGs/SVGcontainer";

import { GET_WISHLIST } from "../../graphQL functions";

const WishList = () => {
  const { loading, error, data } = useQuery(GET_WISHLIST);

  let view;

  if (data === undefined) {
    return (
      <SVGContainer>
        <EmptyWishList />
        <p className="text-3">
          No item in <b>your</b> wish list yet!
        </p>
      </SVGContainer>
    );
  }

  if (data.wishlist.length === 0) {
    view = (
      <SVGContainer>
        <EmptyWishList />
        <p className="text-3">
          No item in <b>your</b> wish list yet!
        </p>
      </SVGContainer>
    );
  }

  if (data.wishlist.length > 0) {
    view = <WishData data={data.wishlist} />;
  }

  return (
    <div className="user-wrapper">
      <div className="header">
        <div className="category">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2"> Wish List </div>
        </div>
      </div>

      <div className="main ">
        <div className="wrapper-item">{view}</div>
      </div>
    </div>
  );
};

export default WishList;
