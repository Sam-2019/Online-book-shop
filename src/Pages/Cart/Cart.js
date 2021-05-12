import React from "react";
import Back from "../Components/Back";
import Button from "../Components/Button";
import Summary from "../Summary/Summary";
import "./cart.css";

import SVGcontainer from "../SVGs/SVGcontainer";
import EmptyCart from "../SVGs/empty-cart";

const Cart = () => {
  
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
        <SVGcontainer>
          <EmptyCart />
          <p className="text-3">
            No item in <b>your</b> cart yet!
          </p>
        </SVGcontainer>
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
