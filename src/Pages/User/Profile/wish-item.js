import React, { Fragment } from "react";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import PopUp from "../../Components/Popup";
import { ConfirmDelete } from "../../styles";
import Button from "../../Components/Button";
import { MediaQuery } from "../../helper";
import "./wishitem.css";

import { DELETE_WISHLIST, GET_WISHLIST } from "../../graphQL functions";

toast.configure();

const WishItem = ({ wishID, productID, name, sku, price, imageURL }) => {
  const breakpoint = 540;
  const { width } = MediaQuery();
  const [confirm, setConfirm] = React.useState(false);

  const [
    deleteWish,
    { loading: deleteLoading, error: deleteError, data: deleteData },
  ] = useMutation(DELETE_WISHLIST, {
    refetchQueries: [{ query: GET_WISHLIST }],
  });

  let history = useHistory();

  const updateBin = () => {
    setConfirm(true);
  };

  const removeItem = async (e) => {
    e.preventDefault();

    deleteWish({
      variables: {
        id: String(wishID),
      },
    });

    if (deleteError) {
      toast.error(deleteError);
    }

    toast.success("Item deleted");
    setConfirm(false);

    const timer = setTimeout(() => {}, 1000);
    return () => clearTimeout(timer);
  };

  return (
    <Fragment>
      <div className="item-wrapper ">
        <div className="order-imageXname">
          <div
            className="image-placeholder"
            onClick={() => {
              history.push(`/product/${sku}`);
            }}
          >
            <img
              src={imageURL}
              alt="peecha"
              className="image-placeholder-original"
            />
          </div>

          <div className="order-item-name-price-quantity">
            <div
              className="order-item-name"
              onClick={() => {
                history.push(`/product/${sku}`);
              }}
            >
              {sku}
            </div>

            <div
              className="order-Item-price-quantity"
              onClick={() => {
                history.push(`/product/${sku}`);
              }}
            >
              <div className="order-item-price">GHc ₵{price}</div>

              {/* <div className=" bin-width">
                <Bin width={18} height={20} action={updateBin} />
              </div> */}
            </div>

            {width > breakpoint ? null : (
              <div className="wishItem-action">
                <div className=" bin-width">
                  <Button
                    class_name="cancel-order"
                    name="Remove"
                    action={updateBin}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {width > breakpoint ? (
          <div className="wishItem-action">
            <div className=" bin-width">
              <Button
                class_name="cancel-order"
                name="Remove"
                action={updateBin}
              />
            </div>
          </div>
        ) : null}
      </div>

      {confirm ? (
        <PopUp>
          <ConfirmDelete>
            Are you sure you want to remove this item from your wish list?
          </ConfirmDelete>

          <Button class_name="primary" name="Remove" action={removeItem} />
          <Button
            class_name="secondary"
            name="Cancel"
            action={() => setConfirm(false)}
          />
        </PopUp>
      ) : null}
    </Fragment>
  );
};

export default WishItem;

WishItem.propTypes = {
  availablity: PropTypes.bool,
  cover_photo_url: PropTypes.string,
  existence: PropTypes.bool,
  id: PropTypes.string,
  product_author: PropTypes.string,
  product_category: PropTypes.string,
  product_description: PropTypes.string,
  product_name: PropTypes.string,
  sku: PropTypes.string,
  stock: PropTypes.string,
  unique_id: PropTypes.string,
  price: PropTypes.string,
};
