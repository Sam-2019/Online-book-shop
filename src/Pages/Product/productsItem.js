import React from "react";
import { useHistory } from "react-router-dom";
import Notify from "../Components/Notify";
import Cart from "../Components/Cart";
import { okukus } from "../endpoints";

const ProductsItem = ({
  unique_id,
  cover_photo_url,
  product_name,
  unit_price,
}) => {
  const [notify, setNotify] = React.useState(false);

  const showNotify = () => {
    setNotify(true);

    const timer = setTimeout(() => {
      setNotify(false);
    }, 3000);
    return () => clearTimeout(timer);
  };

  let history = useHistory();

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
          <div className="products-add2cart">
            <Cart width={17} height={17} action={showNotify} />
          </div>
        </div>
      </div>

      {notify ? (
        <Notify close={() => setNotify(false)}>Item added to cart</Notify>
      ) : null}
    </div>
  );
};

export default ProductsItem;
