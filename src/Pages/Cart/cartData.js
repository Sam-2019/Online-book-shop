import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";

import CartItem from "./cartItem";

import Button from "../Components/Button";
import Summary from "../Summary/Summary";
import { useData } from "../Context";

import { ADD_ORDER } from "../graphQL functions";

import { MediaQuery } from "../helper";

import CartHeader from "./cartHeader";

const CartData = ({ data, refetch }) => {
  let history = useHistory();

  const { uniqueID } = useData();
  const breakpoint = 540;
  const { width } = MediaQuery();
  const [formData, setFormData] = useState("");
  const [checked, setChecked] = useState([]); //cart items from DB

  // console.log(data.length);

  useEffect(() => {
    setFormData(new FormData());
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
    //  console.log(all);
    // var data = formData.get("categories");
  };

 // console.log(checked);

  const [
    addOrder,
    { loading: orderLoading, error: orderError, data: orderData },
  ] = useMutation(ADD_ORDER);

  const array = new Uint32Array(1);
  const index = window.crypto.getRandomValues(array);

  function orderItem() {
    addOrder({
      variables: {
        user: String(uniqueID),
        products: checked,
        orderNumber: index,
        orderValue: index,
      },
    });

    if (!orderData) {
      return;
    }

    history.push(`/order/${index[0]}`);
  }

  return (
    <>
      <div className="main">
        {width > breakpoint ? <CartHeader /> : null}
        {data.map((data, index) => (
          <CartItem
            key={index}
            {...data}
            handleToggle={handleToggle}
            refetch={refetch}
          />
        ))}
      </div>
      <Summary>
        <div className="amountX">
          <div className="amount">Total: $100</div>
        </div>
        <Button
          class_name="checkout"
          name={`Check Out  ()`}
          action={orderItem}
        />
      </Summary>
    </>
  );
};

export default CartData;

CartData.propTypes = {};
