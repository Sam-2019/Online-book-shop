import React from "react";
import Cart from "../Components/Cart";
import './placeholder.css'

const Placeholder = () => {
  return (
    <div className="products">
      {Array(12)
        .fill()
        .map((item, index) => (
          <Item key={index} />
        ))}
    </div>
  );
};

export default Placeholder;

const Item = () => {
  return (
    <div className="products-wrapper">
      {/* <div className="products-discount-rate">-30%</div> */}
      <div className="products-group">
        <div className="products-image-wrapper">
          <img
            src="https://via.placeholder.com/150?text=Okukus.com"
            alt="alt"
            className="products-image"
          />
        </div>
        <div className="placeholder-products-name ">
          <span className="placeholder-item_name  ">{}</span>
        </div>

        {/* <div
          className="products-discount-price"
          onClick={() => {
            history.push(`/product/${unique_id}`);
          }}
        >
          Ghc999
        </div>  */}

        <div className="placeholder-priceXcart">
        <div className="placeholder-products-price"></div>
          <div className="placeholder-products-add2cart">
            <Cart width={17} height={17} color='white' />
          </div>
        </div>
      </div>
    </div>
  );
};
