import React, { Fragment } from "react";
import Cart from "../Components/Cart";
import { MediaQuery } from "../helper";
import image from "./150.png";
import "./products.css";

const Item = () => {
  return (
    <div className="products-wrapper">
      {/* <div className="products-discount-rate">-30%</div> */}
      <div className="products-group">
        <div className="products-image-wrapper">
          <img src={image} alt="alt" className="products-image" />
        </div>
        <div className="placeholder-products-name  ">
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
            <Cart width={17} height={17} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Mobile = () => {
  return (
    <Fragment>
      {Array(6)
        .fill()
        .map((item, index) => (
          <Item key={index} />
        ))}
    </Fragment>
  );
};

const Desktop = () => {
  return (
    <Fragment>
      {Array(12)
        .fill()
        .map((item, index) => (
          <Item key={index} />
        ))}
    </Fragment>
  );
};

const Placeholder = () => {
  const { width } = MediaQuery();

  return (
    <div className="products">{width > 540 ? <Desktop /> : <Mobile />}</div>
  );
};

export default Placeholder;
