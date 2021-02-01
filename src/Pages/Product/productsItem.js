import React from "react";
import { useHistory } from "react-router-dom";
import Notify from "../Components/Notify";
import Cart from "../Components/Cart";

const ProductsItem = ({ index }) => {
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
    <div className="products-wrapper ">
      <div className="products-discount-rate">-30%</div>
      <div className="products-group ">
        <div
          className="products-image "
          onClick={() => {
            history.push(`/product/${index}`);
          }}
        ></div>
        <div
          className="products-name"
          onClick={() => {
            history.push(`/product/${index}`);
          }}
        >
          Logest name ever you go fhrfghdgjhj djhgdjthjtyjrtyjryj see Longest
          htrhetrhetr name ever you go see
        </div>

        <div
          className="products-discount-price"
          onClick={() => {
            history.push(`/product/${index}`);
          }}
        >
          Ghc999
        </div>

        <div className="priceXcart">
          <div className="products-price">Ghc699</div>
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
