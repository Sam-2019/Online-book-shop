import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Cart from "../Components/Cart";

toast.configure();

const ContentItem = () => {
  let history = useHistory();

  const add2Cart = async (e) => {
    e.preventDefault();
  };

  const notify = () => {};

  return (
    <div className="products-wrapper">
      {/* <div className="products-discount-rate">-30%</div> */}
      <div className="products-group">
        <div className="products-image-wrapper">
          <img src alt="alt" className="products-image" />
        </div>
        <div className="products-name ">
          <span className="item_name "></span>
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
          <div className="products-price">₵</div>
          <div className="products-add2cart" onClick={add2Cart}>
            <Cart width={17} height={17} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentItem;

ContentItem.propTypes = {};
