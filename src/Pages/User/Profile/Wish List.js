import React from "react";
import { useQuery } from "react-query";
import WishItem from "./wish-item";
import Back from "../../Components/Back";
import { buyerID, wishList } from "../../endpoints";
import { backendData, axiosMethod } from "../../helper";
import { useData } from "../../Context";

const WishList = () => {
  const { wishlistLength } = useData();
  var formData = new FormData();
  formData.set("buyer_unique_id", buyerID);

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
          {/* {Array(10)
            .fill()
            .map((item, index) => (
              <WishItem key={index} index={index} />
            ))} */}

          {data ? <Wish data={data} /> : <>Loading</>}
        </div>
      </div>
    </div>
  );
};

export default WishList;

export const Wish = ({ data }) => {
  return (
    <>
      {data.map((items, i) => (
        <WishItem key={i} {...items} />
      ))}
    </>
  );
};
