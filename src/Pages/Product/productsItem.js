import React from "react";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Cart from "../Components/Cart";
import { useData } from "../Context";
import { ADD_CART } from "../graphQL functions";

toast.configure();

const ProductsItem = ({ id, name, price, imageURL, sku, quantity }) => {
  let history = useHistory();
  const { uniqueID } = useData();

  const [addCart, { loading: cartLoading, error: cartError, data: cartData }] =
    useMutation(ADD_CART);

  const add2Cart = async (e) => {
    e.preventDefault();

    addCart({
      variables: {
        user: String(uniqueID),
        product: String(id),
        quantity: String(quantity),
        price: String(price),
      },
    });

    if (cartError) {
      toast.error(cartError);
    }

    toast.success("Item added to cart");
  };

  return (
    <div className="products-wrapper">
      {/* <div className="products-discount-rate">-30%</div> */}
      <div className="products-group">
        <div
          className="products-image-wrapper"
          onClick={() => {
            history.push(`/product/${sku}`);
          }}
        >
          <img src={imageURL} alt="alt" className="products-image" />
        </div>
        <div
          className="products-name "
          onClick={() => {
            history.push(`/product/${sku}`);
          }}
        >
          <span className="item_name ">{name}</span>
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
          <div className="products-price">${price}</div>
          <div className="products-add2cart" onClick={add2Cart}>
            <Cart width={17} height={17} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsItem;

ProductsItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  imageURL: PropTypes.string,
  price: PropTypes.string,
  sku: PropTypes.string,
};
