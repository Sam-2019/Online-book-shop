import React from "react";
import "./cart.css";
import Back from "../Components/Back";
import Bin from "../Components/Bin";
import Button from "../Components/Button";
import CartItem from "./cartItem";

import Summary from "../Summary/Summary";

const Cart = () => {
  let amount = 10000;
  let quantity = 100;
  const [state, setState] = React.useState(false);

  function show() {
    setState(true);
  }

  function hide() {
    setState(false);
  }

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
        {Array(3)
          .fill()
          .map((item, index) => (
            <CartItem show={show} key={index} />
          ))}

        <Summary>
          <div className="amount ">Total ${amount}</div>
          <Button class_name="checkout" name={`Check Out  (${quantity})`} />
        </Summary>
      </div>
    </div>
  );
};
export default Cart;
