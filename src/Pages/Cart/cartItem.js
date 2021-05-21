import React from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
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
import { DELETE_CART, ADD_WISHLIST } from "../graphQL functions";
import { useData } from "../Context";
import "./cartItem.css";

toast.configure();

const CartItem = ({
  productID,
  sku,
  price,
  imageURL,
  quantity,
  handleToggle,
  cartID,
  refetch,
}) => {
  const [loveFill, setLoveFill] = React.useState(false);
  const [binFill, setBinFill] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const { uniqueID } = useData();

  const [count, setCount] = React.useState(Number(quantity));

  const [
    deleteCart,
    { loading: deleteLoading, error: deleteError, data: deleteData },
  ] = useMutation(DELETE_CART);

  const [
    addWishlist,
    { loading: wishLoading, error: wishError, data: wishData },
  ] = useMutation(ADD_WISHLIST);

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

    deleteCart({
      variables: {
        id: String(cartID),
        user: String(uniqueID),
      },
    });

    if (deleteError) {
      toast.error(deleteError);
    }

    const timer = setTimeout(() => {
      setBinFill(false);
      setConfirm(false);
      toast.success("Item deleted");
      refetch();
    }, 1000);

    return () => clearTimeout(timer);
  };

  const add2WL = async (e) => {
    e.preventDefault();
    setLoveFill(true);

    addWishlist({
      variables: {
        user: String(uniqueID),
        product: String(productID),
      },
    });

    if (wishError) {
      toast.error(wishError);
    }

    const timer = setTimeout(() => {
      setLoveFill(false);
      toast.success("Item added to wish list");
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
            onChange={handleToggle(productID)}
            type="checkbox"
            value={productID}
            id={sku}
            name={sku}
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
              <label htmlFor={sku} className="item-name">
                {sku}
              </label>

              <div className="item-price">$ {price}</div>
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
