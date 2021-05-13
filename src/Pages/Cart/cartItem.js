import React from "react";
import PropTypes from "prop-types";

import { toast } from "react-toastify";
import Button from "../Components/Button";
import Add from "../Components/Add";
import Subtract from "../Components/Subtract";
import Bin from "../Components/Bin";
import BinFIll from "../Components/BinFill";
import Love from "../Components/Love";
import LoveFill from "../Components/LoveFill";
import PopUp from "../Components/Popup";
import { ConfirmDelete } from "../styles";
import "./cartItem.css";

toast.configure();

const CartItem = ({ id, sku, price, imageURL, quantity, handleToggle }) => {
  const [loveFill, setLoveFill] = React.useState(false);
  const [binFill, setBinFill] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);

  const [count, setCount] = React.useState(Number(quantity));

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

    setBinFill(true);

    const timer = setTimeout(() => {
      setBinFill(false);
    }, 1000);
    setConfirm(true);
    return () => clearTimeout(timer);
  };

  const add2WL = async (e) => {
    e.preventDefault();

    setLoveFill(true);

    const timer = setTimeout(() => {
      setLoveFill(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  const plusItem = async (event) => {
    event.preventDefault();

    setCount((c) => c + 1);
  };

  const minusItem = async (e) => {
    e.preventDefault();

    if (count <= 1) {
      return;
    }
    return setCount((c) => c - 1);
  };

  return (
    <>
      <div className="cart_item_wrapper">
        <div className="checkBox">
          <input
            onChange={handleToggle(id)}
            type="checkbox"
            value={id}
            id={id}
            name={id}
            className="checker"
          />
        </div>

        <div className="cart-item-detail">
          <div className="imageXname">
            <div className="image-placeholder-original ">
              <img
                src={imageURL}
                alt="peecha"
                className="image-placeholder-original"
              />
            </div>

            <div className="nameXprice">
              <label htmlFor={id} className="item-name">
                {sku}
              </label>

              <div className="item-price">GHc {price}</div>
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
                  <Subtract width={16} height={25} action={minusItem} />
                </div>

                <div className="quantity">{count}</div>

                <div className="add">
                  <Add width={16} height={25} action={plusItem} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {confirm ? (
        <PopUp>
          <ConfirmDelete>
            Are you sure you want to remove this id from your shopping cart?
          </ConfirmDelete>

          <Button class_name="primary" name="Remove" action={deleteItem} />
          <Button
            class_name="secondary"
            name="Cancel"
            action={() => setConfirm(false)}
          />
        </PopUp>
      ) : null}
    </>
  );
};

export default CartItem;

CartItem.propTypes = {};
