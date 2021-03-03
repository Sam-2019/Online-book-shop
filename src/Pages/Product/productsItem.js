import React from "react";
import { useHistory } from "react-router-dom";
import Notify from "../Components/Notify";
import Cart from "../Components/Cart";
import { okukus, buyerID, wishCreate } from "../endpoints";
import { axiosMethod } from "../helper";

const ProductsItem = ({
  unique_id,
  cover_photo_url,
  product_name,
  unit_price,
}) => {
  const [notify, setNotify] = React.useState(false);
  const [message, setMessage] = React.useState("");

  let history = useHistory();

  const add2WL = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.set("product_unique_id", unique_id);
    formData.set("buyer_unique_id", buyerID);

    const { data } = await axiosMethod("post", wishCreate, formData);
    setMessage(data.message);

    if (data.error === false) {
      setNotify(true);
    }

    const timer = setTimeout(() => {
      setNotify(false);
    }, 2000);
    return () => clearTimeout(timer);
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
          <span className="item_name "> {product_name}</span>
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
          <div className="products-add2cart" onClick={add2WL}>
            <Cart width={17} height={17} />
          </div>
        </div>
      </div>

      {notify ? (
        <Notify close={() => setNotify(false)}>{message}</Notify>
      ) : null}
    </div>
  );
};

export default ProductsItem;
