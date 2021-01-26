import React from "react";
import Button from "../../Components/Button";
import "./orderitem.css";

const OrderItem = () => {
  let status = "fulfilled";
  let statusColorX;

  switch (status) {
    case "pending":
      statusColorX = "pending";
      break;
    case "processed":
      statusColorX = "processed";
      break;
    case "shipped":
      statusColorX = "shipped";
      break;
    case "fulfilled":
      statusColorX = "fulfilled";
      break;
    case "cancelled":
      statusColorX = "cancelled";
  }

  return (
    <div className="item-wrapper">
      <div className="item-detail">
        <div className="imageXname ">
          <div className="image-placeholder  loading"></div>

          <div className="nameXprice ">
            <div className="item-name">Name kdhskl the debt toalt deed</div>

            <div className="item-price">GHc Price</div>

            {status === "cancelled" ? (
              <div className=" unknown">
                <span className={`status ${statusColorX}`}> {status}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {status === "cancelled" ? null : (
        <div className="actionXstatus">
          <Button class_name="cancel-order" name="Cancel Order" />

          <div className={`status ${statusColorX}`}>{status}</div>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
