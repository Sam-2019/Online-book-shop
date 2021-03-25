import React from "react";
import { toast } from "react-toastify";
import Button from "../../Components/Button";
import Confirm from "../../Components/Confirm";
import { okukus } from "../../endpoints";
import "./orderitem.css";

const OrderItem = ({ cover_photo_url, amount, product_name, status }) => {
  const [confirm, setConfirm] = React.useState(false);
  let status2 = "pending";
  let statusColorX;
  let show;

  const notify = (data) => {
    toast(data);
  };

  const cancelOrder = () => {
    setConfirm(true);
  };

  const Delete = () => {
    // notify(data.message);
    // notify(data.error);
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
    <>
      <div className="item-wrapper ">
        <div className="order-imageXname">
          <div className="image-placeholder  loading">
            <img
              src={`${okukus}/${cover_photo_url}`}
              alt="peecha"
              className="image-placeholder-original"
            />
          </div>

          <div className="order-item-name-price-quantity ">
            <div className="order-item-name">{product_name}</div>

            <div className="order-Item-price-quantity">
              <div className="order-item-price">GHc ₵{amount}</div>

              <div className="order-item-price">Quantity</div>
            </div>
          </div>
        </div>

        <div className="actionXstatus">
          {status === show ? null : (
            <Button
              class_name="cancel-order"
              name="Cancel Order"
              action={() => {
                cancelOrder();
              }}
            />
          )}

          <div className={`status ${statusColorX}`}>{status}</div>
        </div>
      </div>

      {confirm ? (
        <Confirm
          close={() => setConfirm(false)}
          primary="Cancel Order"
          secondary="Close"
        >
          Are you sure you want to cancel this order?
        </Confirm>
      ) : null}
    </>
  );
};

export default OrderItem;
