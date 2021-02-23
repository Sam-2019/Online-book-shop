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
import StarRating from "../Components/Stars";
import ReviewItem from "../Review/reviewItem";
import AddReview from "./addReview";
import Summary from "../Summary/Summary";
import { MediaQuery } from "../helper";

import "./product.css";

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

  const { width } = MediaQuery();

  const [loading, setLoading] = React.useState(false);
  const [notify, setNotify] = React.useState(false);
  const [contractDescription, expandDescription] = React.useState(true);
  const [review, addReview] = React.useState(false);

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
    const title = "google.com";

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

              <Social width={22} height={25} />
            </div>

            <div className="product-detail  ">
              <div className="nameXauthor">
                <div className="product-name ">The Man Who Was Thursday</div>

                <span className="product-author  ">G. K. CHESTERTON</span>

                <div className="prices">
                  <div className="product-price">GHC 699</div>

                  <div className="spacer"></div>

                  <span className="product-discount-price">GHC999</span>
                </div>
              </div>

              {width > 540 ? null : (
                <div className="rateItem">
                  <StarRating value={3.7} width={15} height={15} />
                </div>
              )}

              <div className="product-description-wrapper">
                <div>Description</div>

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
                {width > 540 ? null : (
                  <div
                    className="addReview2 "
                    onClick={() => {
                      addReview(true);
                    }}
                  >
                    Add Review
                  </div>
                )}

                {width > 540 ? (
                  <div className="rating-stars">
                    <StarRating value={3.7} width={15} height={15} />
                  </div>
                ) : null}

                <div className=" see-more">
                  <span
                    className="addReview2"
                    onClick={() => {
                      history.push(`${url}/review`);
                    }}
                  >
                    Reviews
                  </span>
                  <Right width={20} height={20} />
                </div>
              </div>

              {Array(2)
                .fill()
                .map((item, index) => (
                  <ReviewItem key={index} />
                ))}
            </div>
          </div>
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
        ) : null}

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
