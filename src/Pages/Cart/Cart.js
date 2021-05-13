import React from "react";
import { useQuery, gql } from "@apollo/client";
import { MediaQuery } from "../helper";
import Back from "../Components/Back";
import Button from "../Components/Button";
import Summary from "../Summary/Summary";
import CartData from "./cartData";
import CartHeader from "./cartHeader";
import "./cart.css";

import SVGcontainer from "../SVGs/SVGcontainer";
import EmptyCart from "../SVGs/empty-cart";

import { useData } from "../Context";

const GET_CART = gql`
  query User($id: ID!) {
    user(id: $id) {
      cart {
        product
        price
        quantity
      }
    }
  }
`;

const Cart = () => {
  const { uniqueID } = useData();
  const id = String(uniqueID);
  const breakpoint = 540;
  const { width } = MediaQuery();

  const { loading, error, data } = useQuery(GET_CART, {
    variables: { id },
  });

  function orderItem() {}

  return (
    <div className="cart-wrapper">
      <div className="header">
        <div className="category">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2"> Cart (100)</div>
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
            <CartData data={data.user} />
          </>
        ) : null}
      </div>

      <Summary>
        <div className="amountX">
          <div className="amount">Total: $100</div>
        </div>
        <Button
          class_name="checkout"
          name={`Check Out  (100)`}
          action={orderItem}
        />
      </Summary>
    </div>
  );
};
export default Cart;
