import React from "react";
import PropTypes from "prop-types";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Add from "../Components/Add";
import Subtract from "../Components/Subtract";
import Bin from "../Components/Bin";
import BinFIll from "../Components/BinFill";
import Love from "../Components/Love";
import LoveFill from "../Components/LoveFill";
import Confirm from "../Components/Confirm";
import { okukus, cartDelete, buyerID, wishCreate } from "../endpoints";
import { axiosMethod } from "../helper";
import "./cartItem.css";

toast.configure();

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
  const [confirm, setConfirm] = React.useState(false);

  const [count, setCount] = React.useState(Number(quantity));

  const queryClient = useQueryClient();

  const notify = (data) => {
    toast(data);
  };

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



    if (data.message === "cart item deleted successfully") {
      queryClient.invalidateQueries("summaryData");
      queryClient.invalidateQueries("carts");
      notify(data.message);
      setConfirm(false);
    }
  };

  const add2WL = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.set("product_unique_id", product_unique_id);
    formData.set("buyer_unique_id", buyerID);

    setLoveFill(false);

    const { data } = await axiosMethod("post", wishCreate, formData);

    if (!data.error) {
      setLoveFill(true);
      notify(data.message);
    }

    notify(data.error);

    const timer = setTimeout(() => {
      setLoveFill(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  function Plus() {
    setCount((count) => count + 1);
  }

  function Minus() {
    if (count <= 1) {
      return;
    } else {
      setCount((count) => count - 1);
    }
  }

  return (
    <>
      <div className="cart_item_wrapper">
        <div className="checkBox">
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
            <div className="image-placeholder-original ">
              <img
                src={`${okukus}/${cover_photo_url}`}
                alt="peecha"
                className="image-placeholder-original"
              />
            </div>

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
                  <Subtract width={16} height={25} action={Minus} />
                </div>

                <div className="quantity">{count}</div>

                <div className="add">
                  <Add width={16} height={25} action={Plus} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
