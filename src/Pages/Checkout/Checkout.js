import React from "react";
import Back from "../Components/Back";

import "./checkout.css";

const Checkout = () => {
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

      {/* <div className="main">
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
      </Summary> */}
    </div>
  );
};
export default Checkout;
