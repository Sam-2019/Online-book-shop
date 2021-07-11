import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import Button from "../../Components/Button";
import PopUp from "../../Components/Popup";
import { ConfirmDelete } from "../../styles";
import { DELETE_ORDER_ITEM, GET_ORDER } from "../../graphQL functions";
import "./orderitem.css";

toast.configure();

const OrderItem = ({ id, imageURL, price, name, status, sku, quantity }) => {
  const [confirm, setConfirm] = React.useState(false);
  let statusColorX;
  let show;

  const [deleteOrder, {}] = useMutation(DELETE_ORDER_ITEM, {
    refetchQueries: [{ query: GET_ORDER }],
    onCompleted: (data) => {
      console.log(data)
      notify("Order cancelled");
      setConfirm(false);
    },
  });

  const notify = (data) => {
    toast.success(data);
  };

  const cancelOrder = () => {
    setConfirm(true);
  };

  const removeItem = () => {
    console.log(id);

     deleteOrder({
      variables: {
        id: id,
      },
    });

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

          <Button
            class_name="primary"
            name="Cancel Order"
            action={removeItem}
          />
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
