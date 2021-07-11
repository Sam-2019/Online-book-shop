import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../Components/Button";
import PopUp from "../Components/Popup";
import Success from "../Components/Success";

const NotifyOrderSuccess = () => {
  const orderNumber = localStorage.getItem("orderNumber");
  let history = useHistory();
  return (
    <PopUp>
      <Success />
      <div className="order-success">
        <div></div> Thank you for shopping with us! Your order{" "}
        <span className="orderID">{orderNumber}</span> has been placed, pending
        confirmation. We will call you within 24 hours (calling hours: Mon-Fri
        8:30am-5:30pm) to confirm your order . Once the order is confirmed, you
        will not be able to change your order details (e.g recipient, delivery
        address).
      </div>

      <Button
        name="Go Home"
        class_name="primary"
        action={() => {
          history.push("/");
        }}
      />
    </PopUp>
  );
};
export default NotifyOrderSuccess;
