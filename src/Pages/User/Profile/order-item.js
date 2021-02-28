import React from "react";
import Notify from "../../Components/Notify";
import Button from "../../Components/Button";
import Confirm from "../../Components/Confirm";
import "./orderitem.css";

const OrderItem = ({
  cover_photo_url,
  amount,
  datetime_ordered,
  id,
  order_number,
  product_author,
  product_name,
  product_unique_id,
  status,
  unique_id,
}) => {
  const [notify, setNotify] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  let status2 = "pending";
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
    <>
      <div className="item-wrapper ">
        <div className="order-imageXname">
          <div className="image-placeholder  loading"></div>

          <div className="order-item-name-price-quantity ">
            <div className="order-item-name">
            {product_name}
            </div>

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

      {notify ? (
        <Notify
          message="Order successfully cancelled"
          close={() => setNotify(false)}
        />
      ) : null}

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
