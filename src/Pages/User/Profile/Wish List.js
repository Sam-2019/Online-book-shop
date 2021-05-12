import React from "react";
import WishData from "./wishData";
import Back from "../../Components/Back";
import EmptyWishList from "../../SVGs/empty-wishlist";
import SVGContainer from "../../SVGs/SVGcontainer";

const WishList = () => {
  return (
    <div className="user-wrapper">
      <div className="header">
        <div className="category">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2"> Wish List (10)</div>
        </div>
      </div>

      <div className="main ">
        <div className="wrapper-item">
          <SVGContainer>
            <EmptyWishList />
            <p className="text-3">
              No item in <b>your</b> wish list yet!
            </p>
          </SVGContainer>
        </div>
      </div>
    </div>
  );
};

export default WishList;
