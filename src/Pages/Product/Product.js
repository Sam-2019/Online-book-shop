import React from "react";
import styled from "styled-components";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import Notify from "../Components/Notify";
import Back from "../Components/Back";
import Up from "../Components/Up";
import Down from "../Components/Down";
import Right from "../Components/Right";
import Social from "../Components/Social";
import Button from "../Components/Button";
import PopUp from "../Components/Popup";
import Share from "../Components/Share";
import ReviewItem from "../Review/reviewItem";
import AddReview from "./addReview";
import "./product.css";
import StarRating from "../Components/Stars";
import { DotElastic } from "../Components/3Dots";

import Summary from "../Summary/Summary";
import { MediaQuery } from "../helper";

const AddToCart = styled.div`
  width: 40%;

  @media (max-width: 540px) {
  }
`;

const BuyNow = styled.div`
  width: 59%;

  @media (max-width: 540px) {
    width: 58%;
  }
`;

const Product = () => {
  let history = useHistory();
  let { id } = useParams();

  let { url } = useRouteMatch();

  const [loading, setLoading] = React.useState(false);
  const [notify, setNotify] = React.useState(false);
  const [contractDescription, expandDescription] = React.useState(true);
  const [review, addReview] = React.useState(false);

  const { width } = MediaQuery();

  const breakpoint = 540;

  const showNotify = () => {
    setLoading(true);
    setNotify(true);

    const timer = setTimeout(() => {
      setNotify(false);
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  };

  const ToggleDescription = () => {
    expandDescription(!contractDescription);
  };

  const WebShare = (event) => {
    event.preventDefault();
    const title = "Okukus.com";

    const url = document.location.href;
    const canonicalElement = document.querySelector("link[rel=canonical]");

    if (navigator.share) {
      if (canonicalElement !== null) {
        url = canonicalElement.href;
      }

      navigator
        .share({
          title: title,
          text: "Check us out for all your book needs",
          url: url,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
  };

  return (
    <div className="product-wrapper">
      <div className="header">
        <div className="category ">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2"> The book</div>
        </div>

        <div className="category ">
          <div className="object-2">
            <Share width={20} height={20} action={WebShare} />
          </div>
        </div>
      </div>

      <div className="main">
        <div className="wrapper">
          <div className="product-body  ">
            <div className="product-divide">
              <div className="product-image"></div>

              <Social />
            </div>

            <div className="product-detail  ">
              <div className="product-name">Name</div>
              <span className="product-author ">Author</span>
              <div className="new-rating-wrapper">
                {/* <div className="rating-number">4.9</div> */}

                <div className="rating-stars">
                  <StarRating value={3.7} width={15} height={15} />
                </div>

                <div className="review-numbersXright">64 Reviews</div>
              </div>
              <div className="prices">
                <div className="products-price">Ghc699</div>

                <div className="spacer"></div>

                <div className="products-discount-price">Ghc999</div>
              </div>
              {/* <div className="priceXqytXreview ">
                  <div className="product-quantity  ">Qty</div>
                  <div className="line "></div>
                  <div className="product-price">Price</div>
                </div> */}
              {/* 
                <div className="share-social">
                  <div className="shareXicon" onClick={WebShare}>
                    <Share width={15} height={15} />

                    <div className="share">Share</div>
                  </div>

                <Social width={26} height={26} postTitle postUrl hashtags />
                </div> */}

              <div>Description</div>
              <div className="product-description-wrapper">
                {width > 540 ? (
                  <div className="product-description-full">
                    qwertyuiopasdfghjklzxcvbnqwertyuiopasdfghjklzxcvbnm;lkgjoqwekopqgewopgqkpoerqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmngeqlewmopgfmqweopgwqwertyuiopasdfghjklzxcvbqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm
                  </div>
                ) : (
                  <>
                    <div
                      className={
                        contractDescription
                          ? "product-description"
                          : "product-description-full"
                      }
                    >
                      qwertyuiopasdfghjklzxcvbnqwertyuiopasdfghjklzxcvbnm;lkgjoqwekopqgewopgqkpoerqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmngeqlewmopgfmqweopgwqwertyuiopasdfghjklzxcvbqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm
                    </div>
                    <div className="down">
                      {contractDescription ? (
                        <Down
                          width={18}
                          height={20}
                          action={ToggleDescription}
                        />
                      ) : (
                        <Up width={18} height={20} action={ToggleDescription} />
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="add-review-wrapper">
                <div>
                  Reviews<span>(64)</span>
                </div>

                {width > 540 ? (
        null
                      ) : (
                           <div
          className="addReview2 "
          onClick={() => {
            addReview(true);
          }}
        >
          Add Review
        </div>
                )}
              </div>

              {Array(2)
                .fill()
                .map((item, index) => (
                  <ReviewItem key={index} />
                ))}
              {/* <div className=" addReviewXseeMore ">
                  <div
                    className=" addReview"
                    onClick={() => {
                      addReview(true);
                    }}
                  >
                    Add Review
                  </div>

                  <div className=" see-more">
                    <span
                      className="review-numbersXright"
                      onClick={() => {
                        history.push(`${url}/review`);
                      }}
                    >
                      See All Reviews
                    </span>
                    <Right width={20} height={20} />
                  </div>
                </div> */}

              {/* <div className="action-action">
                  <div
                    className=" "
                    onClick={() => {
                      addReview(true);
                    }}
                  >
                    Add Review
                  </div>

                  <div className="product-action  ">
                    <AddToCart>
                      <Button
                        name="Add to Cart"
                        class_name="addCart"
                        action={showNotify}
                        loading={loading}
                      />
                    </AddToCart>

                    <div className="spacer"></div>

                    <BuyNow>
                      <Button
                        name="Buy Now"
                        class_name="buyNow"
                        action={() => {
                          history.push(`/order/${id}`);
                        }}
                      />
                    </BuyNow>
                  </div>
                </div>
          */}
            </div>
          </div>

          {/* <div className="product-action  ">
              <AddToCart>
                <Button
                  name="Add to Cart"
                  class_name="addCart"
                  action={showNotify}
                  loading={loading}
                />
              </AddToCart>

              <BuyNow>
                <Button
                  name="Buy Now"
                  class_name="buyNow"
                  action={() => {
                    history.push(`/order/${id}`);
                  }}
                />
              </BuyNow>
            </div> */}
        </div>
      </div>

      {review ? (
        <PopUp close={() => addReview(false)}>
          <AddReview
            close={() => {
              addReview(false);
            }}
          />
        </PopUp>
      ) : null}

      {notify ? (
        <Notify close={() => setNotify(false)}>Item added to cart</Notify>
      ) : null}

      <Summary>
        {width > 540 ? (
          <div
            className="addReview2 "
            onClick={() => {
              addReview(true);
            }}
          >
            Add Review
          </div>
        ) : (
          null
        )}

        <div className="product-action">
          <Button
            name="Add to Cart"
            class_name="addCart"
            action={showNotify}
            loading={loading}
          />

          <div className="spacer"></div>

          <Button
            name="Buy Now"
            class_name="buyNow"
            action={() => {
              history.push(`/order/${id}`);
            }}
          />
        </div>
      </Summary>
    </div>
  );
};

export default Product;
