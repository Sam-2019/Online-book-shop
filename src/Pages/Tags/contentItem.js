import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Cart from "../Components/Cart";
import { okukus, buyerID, cartAdd } from "../endpoints";
import { axiosMethod } from "../helper";

toast.configure();

const ContentItem = ({
  unique_id,
  cover_photo_url,
  product_name,
  unit_price,
}) => {
  let history = useHistory();

  const queryClient = useQueryClient();

  const add2Cart = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.set("product_unique_id", unique_id);
    formData.set("buyer_unique_id", buyerID);

    const { data } = await axiosMethod("post", cartAdd, formData);

    queryClient.invalidateQueries("summaryData");

    if (!data.error) {
      notify(data.message);
    }

    notify(data.error);
  };

  const notify = (data) => {
    toast.success(data);
  };

  return (
    <div className="products-wrapper">
      {/* <div className="products-discount-rate">-30%</div> */}
      <div className="products-group">
        <div
          className="products-image-wrapper"
          onClick={() => {
            history.push(`/product/${unique_id}`);
          }}
        >
          <img
            src={`${okukus}/${cover_photo_url}`}
            alt="alt"
            className="products-image"
          />
        </div>
        <div
          className="products-name "
          onClick={() => {
            history.push(`/product/${unique_id}`);
          }}
        >
          <span className="item_name ">{product_name}</span>
        </div>

        {/* <div
          className="products-discount-price"
          onClick={() => {
            history.push(`/product/${unique_id}`);
          }}
        >
          Ghc999
        </div>  */}

        <div className="priceXcart">
          <div className="products-price">₵{unit_price}</div>
          <div className="products-add2cart" onClick={add2Cart}>
            <Cart width={17} height={17} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentItem;

ContentItem.propTypes = {
  unique_id: PropTypes.string,
  cover_photo_url: PropTypes.string,
  product_name: PropTypes.string,
  unit_price: PropTypes.string,
};
