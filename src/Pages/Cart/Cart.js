import React from "react";
import { useQuery } from "@apollo/client";

import Back from "../Components/Back";

import CartData from "./cartData";

import "./cart.css";
import { GET_CART } from "../graphQL functions";

import SVGcontainer from "../SVGs/SVGcontainer";
import EmptyCart from "../SVGs/empty-cart";
import { useData } from "../Context";

const Cart = () => {
  const { uniqueID } = useData();

  const id = String(uniqueID);

  const { loading, error, data, refetch } = useQuery(GET_CART, {
    variables: { id },
  });

  let view;

  if (data === undefined) {
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

        <div>
          <SVGcontainer>
            <EmptyCart />
            <p className="text-3">
              No item in <b>your</b> cart yet!
            </p>
          </SVGcontainer>
        </div>
      </div>
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
    view = (
      <div className="">
        <CartData data={data.carts} refetch={refetch} />
      </div>
    );
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
