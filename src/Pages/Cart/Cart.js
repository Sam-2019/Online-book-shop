import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import Back from "../Components/Back";
import Button from "../Components/Button";
import Summary from "../Summary/Summary";
import CartData from "./cartData";

import "./cart.css";
import { products } from "../jsdata";
import { GET_CART } from "../graphQL functions";

import SVGcontainer from "../SVGs/SVGcontainer";
import EmptyCart from "../SVGs/empty-cart";
import { useData } from "../Context";

const Cart = () => {
  const { uniqueID } = useData();

  const id = String(uniqueID);

  console.log(id);

  const { loading, error, data, refetch } = useQuery(GET_CART, {
    variables: { id },
  });

  console.log(data);

  let history = useHistory();

  const array = new Uint32Array(1);
  const index = window.crypto.getRandomValues(array);

  function orderItem() {
    history.push(`/order/${index[0]}`);
  }

  return (
    <div className="cart-wrapper">
      <div className="header">
        <div className="category">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2"> Cart </div>
        </div>
      </div>

      <div className="main">
        {loading ? (
          <SVGcontainer>
            <EmptyCart />
            <p className="text-3">
              No item in <b>your</b> cart yet!
            </p>
          </SVGcontainer>
        ) : (
          <CartData data={data.carts} refetch={refetch} />
        )}
      </div>

      <Summary>
        <div className="amountX">
          <div className="amount">Total: $100</div>
        </div>
        <Button
          class_name="checkout"
          name={`Check Out  (${products.length})`}
          action={orderItem}
        />
      </Summary>
    </div>
  );
};
export default Cart;
