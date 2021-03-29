import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { MediaQuery, fetchMore } from "../helper";
import Back from "../Components/Back";
import Bin from "../Components/Bin";
import Button from "../Components/Button";
import Summary from "../Summary/Summary";
import CartData from "./cartData";
import CartHeader from "./cartHeader";
import { useData } from "../Context";
import { cartGet } from "../endpoints";
import "./cart.css";

import SVGcontainer from "../SVGs/SVGcontainer";
import EmptyCart from "../SVGs/empty-cart";

const Cart = () => {
  const { uniqueID, amount, quantity } = useData();
  let history = useHistory();
  const { width } = MediaQuery();
  const breakpoint = 540;

  var formData = new FormData();
  formData.set("buyer_unique_id", uniqueID);

  const { status, data, error, isFetching, isPreviousData } = useQuery(
    ["carts", uniqueID],
    () => fetchMore(cartGet, formData),
    {
      keepPreviousData: true,
      staleTime: 5000,
      cacheTime: 20000,
    }
  );

  var array = new Uint32Array(1);
  var index = window.crypto.getRandomValues(array);

  return (
    <div className="cart-wrapper">
      <div className="header">
        <div className="category">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2"> Cart ({quantity})</div>
        </div>

        <div className="category">
          <div className="object-3">
            <Bin width={30} height={30} />
          </div>
        </div>
      </div>

      <div className="main">
        {data === undefined ? (
          <SVGcontainer>
            <EmptyCart />
            <p className="text-3">
              No item in <b>your</b> cart yet!
            </p>
          </SVGcontainer>
        ) : null}

        {data ? (
          <>
            {width > breakpoint ? <CartHeader /> : null}
            <CartData data={data} />
          </>
        ) : null}

        {/* {data ? (
          <>
            {width > breakpoint ? <CartHeader /> : null}
            <CartData data={data} />
          </>
        ) : (
          <SVGcontainer>
            <EmptyCart />
            <p className="text-3">
              No item in <b>your</b> cart yet!
            </p>
          </SVGcontainer>
        )} */}
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
            history.push(`/order/${index[0]}`);
          }}
        />
      </Summary>
    </div>
  );
};
export default Cart;
