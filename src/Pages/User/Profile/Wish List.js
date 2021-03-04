import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import WishItem from "./wish-item";
import Back from "../../Components/Back";
import { buyerID, wishList } from "../../endpoints";
import { backendData } from "../../helper";

const WishList = () => {
  var formData = new FormData();
  formData.set("buyer_unique_id", buyerID);

  const [qty, setQty] = React.useState(0);

  React.useEffect(() => {
    let didCancel = false;

    async function wlData() {
      const result = await axios({
        method: "post",
        url: wishList,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!didCancel) {
        setQty(result.data.data.length);
      }
    }
    wlData();

    return () => {
      didCancel = true;
    };
  }, [formData]);

  const { status, data, error, isFetching, isPreviousData } = useQuery(
    ["wishList", wishList, formData],
    () => backendData(wishList, formData),
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
          <div className="object-2"> Wish List ({qty})</div>
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
