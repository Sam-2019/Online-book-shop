import React from "react";
import { useQuery } from "react-query";
import WishData from "./wishData";
import Back from "../../Components/Back";
import { buyerID, wishList } from "../../endpoints";
import { fetch } from "../../helper";
import { useData } from "../../Context";
import EmptyWishList from "../../SVGs/empty-wishlist";
import SVGContainer from "../../SVGs/SVGcontainer";

const WishList = () => {
  const { wishlistLength } = useData();

  var formData = new FormData();
  formData.set("buyer_unique_id", buyerID);

  const { status, data } = useQuery(
    ["wishlist", buyerID, wishList],
    () => fetch(wishList, formData),
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
          <div className="object-2"> Wish List ({wishlistLength})</div>
        </div>
      </div>

      <div className="main ">
        <div className="wrapper-item">
          {data === undefined ? (
            <SVGContainer>
              <EmptyWishList />
              <p className="text-3">
                No item in <b>your</b> wish list yet!
              </p>
            </SVGContainer>
          ) : null}

          {data ? <WishData data={data.data} /> : null}
        </div>
      </div>
    </div>
  );
};

export default WishList;
