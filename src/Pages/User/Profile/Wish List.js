import React from "react";
import { useQuery } from "react-query";
import WishData from "./wishData";
import Back from "../../Components/Back";
import { buyerID, wishList } from "../../endpoints";
import { backendData } from "../../helper";
import { useData } from "../../Context";

const WishList = () => {
  const { wishlistLength } = useData();
  
  var formData = new FormData();
  formData.set("buyer_unique_id", buyerID);

  const { status, data, error, isFetching, isPreviousData } = useQuery(
    ["wishlist", wishList, formData],
    () => backendData(wishList, formData),
    {
      keepPreviousData: true,
      staleTime: 5000,
      cacheTime: 20000,
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
          {data ? <WishData data={data} /> : <>Loading</>}
        </div>
      </div>
    </div>
  );
};

export default WishList;
