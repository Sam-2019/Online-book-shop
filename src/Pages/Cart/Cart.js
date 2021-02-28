import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { useHistory } from "react-router-dom";
import { MediaQuery, backendData } from "../helper";
import Back from "../Components/Back";
import Bin from "../Components/Bin";
import Button from "../Components/Button";
import Summary from "../Summary/Summary";
import CartMain from "./cartMain";
import { buyerID, cartGet } from "../endpoints";
import "./cart.css";


const Cart = () => {
  let amount = 10000;
  let quantity = 100;
  let history = useHistory();
  const { width } = MediaQuery();
  const breakpoint = 540;

  var formData = new FormData();
  formData.set("buyer_unique_id", buyerID);

  //const [data, setData] = React.useState([]);

  // const cartData = async () => {
  //   formData.set("buyer_unique_id", buyerID);

  //   const { data } = await axios({
  //     method: "post",
  //     url: cartGet,
  //     data: formData,
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });
  // };

  // React.useEffect(() => {
  //   cartData();
  // }, [cartData]);

  const queryClient = useQueryClient();

  const { status, data, error, isFetching, isPreviousData } = useQuery(
    ["carts", cartGet, formData],
    () => backendData(cartGet, formData),
    {
      keepPreviousData: true,
      staleTime: 5000,
      cacheTime: 20000,
    }
  );
  return (
    <div className="cart-wrapper">
      <div className="header">
        <div className="category">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2"> Cart (1)</div>
        </div>

        <div className="category">
          <div className="object-3">
            <Bin width={30} height={30} />
          </div>
        </div>
      </div>

      <div className="main">
        {width > breakpoint ? (
          <>
            <div className="cart_item_wrapper">
              <div className="checkBox">
                <input type="checkbox" value="0" hidden />
              </div>

              <div className="cart-item-detail ">
                <div className="imageXname ">
                  <div className="item-name">Product name</div>

                  <div className="item-price">Price</div>
                </div>

                <div className="priceXactions">
                  <div className="binXaddXsubtract">Quantity</div>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {data ? <CartMain data={data} /> : <>Loading</>}
      </div>

      <Summary>
        <div className="amountX">
          <div className="amount">
            Total: ${Intl.NumberFormat().format(amount)}
          </div>
        </div>
        <Button
          class_name="checkout"
          name={`Check Out  (${quantity})`}
          action={() => {
            history.push(`/order`);
          }}
        />
      </Summary>
    </div>
  );
};
export default Cart;
