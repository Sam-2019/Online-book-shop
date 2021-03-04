import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import OrderItem from "./order-item";
import Back from "../../Components/Back";
import { buyerID, orderHistory } from "../../endpoints";
import { backendData } from "../../helper";

const OrderHistory = () => {
  var formData = new FormData();
  formData.set("buyer_unique_id", buyerID);

  const [qty, setQty] = React.useState(0);

  React.useEffect(() => {
    let didCancel = false;

    async function oData() {
      const result = await axios({
        method: "post",
        url: orderHistory,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!didCancel) {
        setQty(result.data.data.length);
      }
    }
    oData();

    return () => {
      didCancel = true;
    };
  }, [formData]);

  const { status, data, error, isFetching, isPreviousData } = useQuery(
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
          <div className="object-2"> Orders ({qty})</div>
        </div>
      </div>

      <div className="main">
        <div className="wrapper-item">
          
          {/* {Array(10)
            .fill()
            .map((item, index) => (
              <OrderItem key={index} />
            ))} */}

          {data ? <Orders data={data} /> : <>Loading</>}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;

const Orders = ({ data }) => {
  return (
    <>
      {data.map((items, i) => (
        <OrderItem key={i} {...items} />
      ))}
    </>
  );
};
