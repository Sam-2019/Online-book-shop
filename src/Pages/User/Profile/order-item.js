import React from "react";
import Notify from "../../Components/Notify";
import Button from "../../Components/Button";
import Confirm from "../../Components/Confirm";
import "./orderitem.css";

const OrderItem = () => {
  const [notify, setNotify] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  let status = "pending";
  let statusColorX;
  let show;

  const showNotify = () => {
    setNotify(true);

    const timer = setTimeout(() => {
      setNotify(false);
    }, 3000);
    return () => clearTimeout(timer);
  };

  const cancelOrder = () => {
    setConfirm(true);
  };

  switch (status) {
    case "pending":
      statusColorX = "pending";
      show = null;
      break;
    case "processed":
      statusColorX = "processed";
      show = null;
      break;
    case "shipped":
      statusColorX = "shipped";
      show = "shipped";
      break;
    case "fulfilled":
      statusColorX = "fulfilled";
      show = "fulfilled";
      break;
    case "cancelled":
      statusColorX = "cancelled";
      show = "cancelled";
  }

  return (
    <div className="item-wrapper">
      <div className="item-detail">
        <div className="imageXname ">
          <div className="image-placeholder  loading"></div>

          <div className="nameXprice ">
            <div className="item-name">Name kdhskl the debt toalt deed</div>

            <div className="item-price">GHc Price</div>

            {status === show ? (
              <div className=" cancel-width">
                <span className={`status ${statusColorX}`}> {status}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {status === show ? null : (
        <div className="actionXstatus">
          <Button
            class_name="cancel-order"
            name="Cancel Order"
            action={() => {
              cancelOrder();
            }}
          />

          <div className={`status ${statusColorX}`}>{status}</div>
        </div>
      )}

      {notify ? (
        <Notify
          message="Order successfully cancelled"
          close={() => setNotify(false)}
        />
      ) : null}

      {confirm ? (
        <Confirm close={() => setConfirm(false)}>
          Are you sure you want to cancel this order?
        </Confirm>
      ) : null}
    </div>
  );
};

export default OrderItem;
