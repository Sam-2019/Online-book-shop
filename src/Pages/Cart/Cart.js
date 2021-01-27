import React from "react";
import { useParams, useHistory } from "react-router-dom";
import "./cart.css";
import Back from "../Components/Back";
import Bin from "../Components/Bin";
import Button from "../Components/Button";
import CartItem from "./cartItem";

import Summary from "../Summary/Summary";

const Cart = () => {
  let amount = 10000;
  let quantity = 100;
  let history = useHistory();
  let { id } = useParams();
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

      <div className="main-1  ">
        <div className=" wrapper-item">
          {Array(5)
            .fill()
            .map((item, index) => (
              <CartItem show={show} key={index} />
            ))}
        </div>

        <Summary>
          <div className="amount ">Total ${amount}</div>
          <Button
            class_name="checkout"
            name={`Check Out  (${quantity})`}
            action={() => {
              history.push(`/order/${id}`);
            }}
          />
        </Summary>
      </div>
    </div>
  );
};
export default Cart;
