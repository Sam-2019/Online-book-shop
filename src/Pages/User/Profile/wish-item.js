import React from "react";
import PropTypes from "prop-types";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Confirm from "../../Components/Confirm";
import Button from "../../Components/Button";
import { okukus, wishDelete, buyerID } from "../../endpoints";
import { MediaQuery, axiosMethod } from "../../helper";
import "./wishitem.css";

toast.configure();

const WishItem = ({
  availablity,
  cover_photo_url,
  existence,
  id,
  product_author,
  product_category,
  product_description,
  product_name,
  product_unique_id,
  stock,
  unique_id,
  unit_price,
}) => {
  const breakpoint = 540;
  const { width } = MediaQuery();
  const [confirm, setConfirm] = React.useState(false);

  const queryClient = useQueryClient();

  let history = useHistory();

  const notify = (data) => {
    toast.success(data);
  };

  const updateBin = () => {
    setConfirm(true);
  };

  const removeItem = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.set("buyer_unique_id", buyerID);
    formData.set("item_unique_id", unique_id);

    const { data } = await axiosMethod("post", wishDelete, formData);

    if (data.message === "wishlist item deleted successfully") {
      queryClient.invalidateQueries("wishlistLength");
      setConfirm(false);
      notify(data.message);
      queryClient.invalidateQueries("wishlistLength");
    }

    notify(data.error);

    queryClient.invalidateQueries("wishlist");
  };

  return (
    <>
      <div className="item-wrapper">
        <div className="order-imageXname">
          <div
            className="image-placeholder  loading"
            onClick={() => {
              history.push(`/product/${product_unique_id}`);
            }}
          >
            <img
              src={`${okukus}/${cover_photo_url}`}
              alt="peecha"
              className="image-placeholder-original"
            />
          </div>

          <div className="order-item-name-price-quantity">
            <div
              className="order-item-name"
              onClick={() => {
                history.push(`/product/${product_unique_id}`);
              }}
            >
              {product_name}
            </div>

            <div
              className="order-Item-price-quantity"
              onClick={() => {
                history.push(`/product/${product_unique_id}`);
              }}
            >
              <div className="order-item-price">GHc ₵{unit_price}</div>

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
        <Confirm
          close={() => setConfirm(false)}
          primary="Remove"
          primaryaction={removeItem}
          secondary="Cancel"
        >
          Are you sure you want to remove this item from your wish list?
        </Confirm>
      ) : null}
    </>
  );
};

export default WishItem;

WishItem.propTypes = {
  availablity: PropTypes.string,
  cover_photo_url: PropTypes.string,
  existence: PropTypes.string,
  id: PropTypes.string,
  product_author: PropTypes.string,
  product_category: PropTypes.string,
  product_description: PropTypes.string,
  product_name: PropTypes.string,
  product_unique_id: PropTypes.string,
  stock: PropTypes.string,
  unique_id: PropTypes.string,
  unit_price: PropTypes.string,
};
