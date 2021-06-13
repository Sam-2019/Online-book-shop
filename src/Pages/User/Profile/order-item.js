import React,{Fragment} from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Button from "../../Components/Button";
import PopUp from "../../Components/Popup";
import { ConfirmDelete } from "../../styles";
import "./orderitem.css";

toast.configure();

const OrderItem = ({ imageURL, price, name, status, sku, quantity }) => {
  const [confirm, setConfirm] = React.useState(false);
  let statusColorX;
  let show;

  const notify = (data) => {
    toast.success(data);
  };

  const cancelOrder = () => {
    setConfirm(true);
  };

  const Delete = () => {
    notify("Order cancelled");
    setConfirm(false);
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
    <Fragment>
      <div className="item-wrapper ">
        <div className="order-imageXname">
          <div className="image-placeholder  loading">
            <img
              src={imageURL}
              alt="peecha"
              className="image-placeholder-original"
            />
          </div>

          <div className="order-item-name-price-quantity ">
            <div className="order-item-name">{name}</div>

            <div className="order-Item-price-quantity">
              <div className="order-item-price">GHc ₵{price}</div>

              <div className="order-item-price">{quantity}</div>
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
        <PopUp>
          <ConfirmDelete>
            Are you sure you want to cancel this order?
          </ConfirmDelete>

          <Button class_name="primary" name="Cancel Order" action={Delete} />
          <Button
            class_name="secondary"
            name="Ignore"
            action={() => setConfirm(false)}
          />
        </PopUp>
      ) : null}
    </Fragment>
  );
};

export default OrderItem;

OrderItem.propTypes = {
  cover_photo_url: PropTypes.string,
  product_name: PropTypes.string,
  amount: PropTypes.string,
  status: PropTypes.string,
};
