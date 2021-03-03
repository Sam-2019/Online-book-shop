import React from "react";
import PropTypes from "prop-types";
import { useQueryClient } from "react-query";
import Notify from "../Components/Notify";
import Add from "../Components/Add";
import Subtract from "../Components/Subtract";
import Bin from "../Components/Bin";
import BinFIll from "../Components/BinFill";
import Love from "../Components/Love";
import LoveFill from "../Components/LoveFill";
import Confirm from "../Components/Confirm";
import { cartDelete, buyerID, wishCreate } from "../endpoints";
import { axiosMethod } from "../helper";
import "./cartItem.css";

const CartItem = ({
  unit_price,
  product_name,
  cover_photo_url,
  quantity,
  id,
  product_unique_id,
  handleToggle,
  unique_id,
  onFormSubmit,
}) => {
  const [loveFill, setLoveFill] = React.useState(false);
  const [binFill, setBinFill] = React.useState(false);
  const [notify, setNotify] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const queryClient = useQueryClient();

  const updateBin = () => {
    setBinFill(true);

    const timer = setTimeout(() => {
      setBinFill(false);
    }, 1000);
    setConfirm(true);
    return () => clearTimeout(timer);
  };

  const deleteItem = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.set("item_unique_id", unique_id);
    formData.set("buyer_unique_id", buyerID);

    const { data } = await axiosMethod("post", cartDelete, formData);
    setMessage(data.message);

    if (data.message === "cart item deleted successfully") {
      queryClient.invalidateQueries("carts");
      setNotify(true);
      setConfirm(false);
    }

    const timer = setTimeout(() => {
      setNotify(false);
    }, 3000);
    return () => clearTimeout(timer);
  };

  const add2WL = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.set("product_unique_id", product_unique_id);
    formData.set("buyer_unique_id", buyerID);

    setLoveFill(false);

    const { data } = await axiosMethod("post", wishCreate, formData);
    setMessage(data.message);

    if (data.error === false) {
      setLoveFill(true);
      setNotify(true);
    }

    const timer = setTimeout(() => {
      setNotify(false);
      setLoveFill(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <>
      <div className="cart_item_wrapper">
        <div className="checkBox item">
          <input
            onChange={handleToggle(unique_id)}
            type="checkbox"
            value={unique_id}
            id={product_name}
            name={product_name}
          />
        </div>

        <div className="cart-item-detail">
          <div className="imageXname">
            <div className="image-placeholder  loading"></div>

            <div className="nameXprice">
              <label htmlFor={product_name} className="item-name">
                {product_name}
              </label>

              <div className="item-price">GHc {unit_price}</div>
            </div>
          </div>

          <div className="priceXactions">
            <div className="love " onClick={add2WL}>
              {loveFill ? (
                <LoveFill width={18} height={20} />
              ) : (
                <Love width={18} height={20} />
              )}
            </div>

            <div className="bin" onClick={updateBin}>
              {binFill ? (
                <BinFIll width={18} height={20} />
              ) : (
                <Bin width={18} height={20} />
              )}
            </div>

            <div className="binXaddXsubtract">
              <div
                className="addXsubtract 
            "
              >
                <div className="subtract">
                  <Subtract width={16} height={25} />
                </div>

                <div className="quantity">1</div>

                <div className="add">
                  <Add width={16} height={25} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {notify ? (
        <Notify close={() => setNotify(false)}>{message}</Notify>
      ) : null}

      {confirm ? (
        <Confirm
          close={() => setConfirm(false)}
          primary="Delete"
          primaryaction={deleteItem}
          secondary="Cancel"
        >
          Are you sure you want to remove this product from your shopping cart?
        </Confirm>
      ) : null}
    </>
  );
};

export default CartItem;

CartItem.propTypes = {
  handleToggle: PropTypes.func,
  // i:PropTypes.Number
};
