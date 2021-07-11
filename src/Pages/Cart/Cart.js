import React from "react";
import { useQuery } from "@apollo/client";
import Back from "../Components/Back";
import CartData from "./cartData";
import "./cart.css";
import { GET_CART } from "../graphQL functions";

import SVGcontainer from "../SVGs/SVGcontainer";
import EmptyCart from "../SVGs/empty-cart";
import PageWrapper from "../Components/PageWrapper";

const Cart = () => {
  const { loading, error, data } = useQuery(GET_CART);

  let view;

  if (data === undefined) {
    return (
      <PageWrapper pageTitle="Cart" wrapper="cart-wrapper">
        <SVGcontainer>
          <EmptyCart />
          <p className="text-3">
            No item in <b>your</b> cart yet!
          </p>
        </SVGcontainer>
      </PageWrapper>
    );
  }

  if (data.carts.length === 0) {
    view = (
      <SVGcontainer>
        <EmptyCart />
        <p className="text-3">
          No item in <b>your</b> cart yet!
        </p>
      </SVGcontainer>
    );
  }

  if (data.carts.length > 0) {
    view = <CartData data={data.carts} />;
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

      <div>{view}</div>
    </div>
  );
};
export default Cart;
