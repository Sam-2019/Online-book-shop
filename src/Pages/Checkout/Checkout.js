import React from "react";
import PropTypes from "prop-types";
import Back from "../Components/Back";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import Home from "../Components/Home";
import Message from "../Components/Message";
import Select from "./Select";
import Summary from "../Summary/Summary";
import "./checkout.css";

const Checkout = () => {
  let amount = 10000;
  let quantity = 100;
  const [paymentMethod, setPaymentMethod] = React.useState("");

  let selectedOption = null;

  switch (paymentMethod) {
    case "Cash":
      selectedOption = "cash";
      break;
    case "Momo":
      selectedOption = "momo";
  }

  return (
    <div className="checkout-wrapper">
      <div className="header ">
        <div className="category ">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2"> Checkout</div>
        </div>
      </div>

      <div className="main">
        <form className="form-wrapper ">
          <div className="page_title"> Shipping Information</div>
          <Input class_name="input " placeholder="Location" onChange />
          <Input class_name="input " placeholder="Digital Address" onChange />
          <Input class_name="input " placeholder="Phone Number" onChange />

          <div className="page_title">Payment Method</div>
          <div className="payment-method">
            <div
              className={selectedOption === "cash" ? "cash" : "select"}
              onClick={() => {
                setPaymentMethod("Cash");
              }}
            >
              Cash
            </div>
            <div
              className={selectedOption === "momo" ? "momo" : "select"}
              onClick={() => {
                setPaymentMethod("Momo");
              }}
            >
              Momo
            </div>
          </div>

          <Select />


          {selectedOption === "momo" ? (
            <>
              <Input class_name="input " placeholder="Name" onChange />
              <Input class_name="input " placeholder="Momo Number" onChange />
              <Input
                class_name="input "
                placeholder="Transaction ID"
                onChange
              />
            </>
          ) : null}
        </form>
      </div>

      <Summary>
        <div className="amount ">Total ${amount}</div>
        <Button class_name="checkout" name={`Check Out  (${quantity})`} />
      </Summary>
    </div>
  );
};
export default Checkout;
