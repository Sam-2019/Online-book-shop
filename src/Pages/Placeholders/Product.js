import React from "react";
import styled from "styled-components";
import Back from "../Components/Back";

import Button from "../Components/Button";
import Share from "../Components/Share";
import StarRating from "../Components/Stars";

import Summary from "../Summary/Summary";
import { MediaQuery } from "../helper";
import image from './250x350.png';
import "./product.css";

export const Spacer = styled.div`
  margin: 0 5px 0 0;
`;

const Placeholder = () => {
  const { width } = MediaQuery();
  return (
    <div className="product-wrapper">
      <div className="header">
        <div className="category ">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2">Loading...</div>
        </div>

        <div className="category ">
          <div className="object-2">
            <Share width={20} height={20} />
          </div>
        </div>
      </div>

      <div className="main">
        <div className="wrapper">
          <div className="product-body">
            <div className="product-divide">
              <div className="product-image-wrapper">
                <img
                  src={image}
                  alt="peecha"
                  className="product-image"
                />
              </div>
            </div>

            <div className="product-detail  ">
              <div className="nameXauthor outline">
                <div className="placeholder-nameXaction"></div>

                <div className="prices">
                  <div className="disabled-product-price">Loading</div>
                </div>
              </div>

              {width > 540 ? null : (
                <div className="rateItem outline">
                  <StarRating width={15} height={15} />
                </div>
              )}

              <div className="product-description-wrapper outline">
                <div className="product-title">Description</div>

                <div className="product-description-full">Loading</div>
              </div>

              <div className="review-box outline">
                {width > 540 ? (
                  <div className="product-title ">Ratings and Reviews</div>
                ) : null}

                {width > 540 ? null : (
                  <div className="product-title ">Reviews</div>
                )}

                <div className="add-review-wrapper">
                  {width > 540 ? null : (
                    <div className="disabled-review ">Loading</div>
                  )}

                  {width > 540 ? (
                    <div className="rating-stars">
                      <StarRating width={15} height={15} />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Summary>
        {width > 540 ? (
          <div className="disabled-review2  ">Add Review</div>
        ) : null}

        <div className="product-action">
          <Button name="Add to Cart" class_name="disabled-addCart" />

          <Spacer />

          <Button name="Buy Now" class_name="disabled-buyNow" />
        </div>
      </Summary>
    </div>
  );
};

export default Placeholder;
