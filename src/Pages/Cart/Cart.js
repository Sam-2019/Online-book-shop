import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { MediaQuery } from "../helper";
import Back from "../Components/Back";
import Bin from "../Components/Bin";
import Button from "../Components/Button";
import CartItem from "./cartItem";
import Summary from "../Summary/Summary";
import "./cart.css";

const Cart = () => {
  let amount = 10000;
  let quantity = 100;
  let history = useHistory();
  let { id } = useParams();
  const { width } = MediaQuery();
  const breakpoint = 540;

  const [formData, setFormData] = useState("");
  const [checked, setChecked] = useState([]); //cart items from DB
  const [message, setMessage] = useState("");

  useEffect(() => {
    setFormData(new FormData());
    onFormSubmit();
  }, []);

  const handleToggle = (c) => () => {
    // return the first index or -1
    const clickedCategory = checked.indexOf(c);

    const all = [...checked];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }

    setChecked(all);
    formData.set("categories", all);

    var data = formData.get("categories");
    console.log(data);
  };

  function onFormSubmit(messagE) {
    setMessage(messagE);
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

      <div className="main ">
        {width > breakpoint ? (
          <>
            <div className="cart_item_wrapper">
              <div className="checkBox">
                <input type="checkbox" value="0" />
              </div>

              <div className="cart-item-detail">
                <div className="imageXname">
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

        {Array(5)
          .fill()
          .map((items, i) => (
            <CartItem
              key={i}
              {...items}
              handleToggle={handleToggle}
              onFormSubmit={onFormSubmit}
            />
          ))}
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
            history.push(`/order/${id}`);
          }}
        />
      </Summary>
    </div>
  );
};
export default Cart;
