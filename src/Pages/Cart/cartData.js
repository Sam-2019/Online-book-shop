import React, { useEffect, useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import CartItem from "./cartItem";
import Button from "../Components/Button";
import Summary from "../Summary/Summary";
import { useData } from "../Context";
import { ADD_ORDER, GET_CART, GET_ORDER } from "../graphQL functions";
import { MediaQuery } from "../helper";
import CartHeader from "./cartHeader";

const CartData = ({ data }) => {
  let history = useHistory();

  const {} = useData();
  const breakpoint = 540;
  const { width } = MediaQuery();
  const [formData, setFormData] = useState("");
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    setFormData(new FormData());
  }, []);

  const handleToggle = (c) => () => {
    const clickedCategory = checked.indexOf(c);

    const all = [...checked];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }

    setChecked(all);
    formData.set("categories", all);
  };

  const [addOrder] = useMutation(ADD_ORDER, {
    refetchQueries: [{ query: GET_CART }],
    refetchQueries: [{ query: GET_ORDER }],
    onCompleted: (data) => {},
  });

  const array = new Uint32Array(1);
  const index = window.crypto.getRandomValues(array);

  function orderItem() {
    if (checked.length === 0) {
      return;
    }

    localStorage.setItem("orderNumber", index[0]);

    addOrder({
      variables: {
        products: checked,
        orderNumber: String(index[0]),
      },
    });

    history.push(`/order/${index[0]}`);
  }

  return (
    <Fragment>
      <div className="main">
        {width > breakpoint && <CartHeader />}
        {data.map((data, index) => (
          <CartItem key={index} {...data} handleToggle={handleToggle} />
        ))}
      </div>
      <Summary>
        <div className="amountX"></div>
        <Button class_name="checkout" name="Check out" action={orderItem} />
      </Summary>
    </Fragment>
  );
};

export default CartData;

CartData.propTypes = {
  data: PropTypes.array,
};
