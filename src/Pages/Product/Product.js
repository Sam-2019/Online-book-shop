import React from "react";
import styled from "styled-components";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
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
import Love from "../Components/Love";
import LoveFill from "../Components/LoveFill";
import ReviewItem from "../Review/reviewItem";
import AddReview from "./addReview";
import Summary from "../Summary/Summary";
import { MediaQuery } from "../helper";
import { itemGet } from "../endpoints";

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
  const [loveFill, setLoveFill] = React.useState(false);

  const updateLove = () => {
    setLoveFill(true);

    const timer = setTimeout(() => {
      setLoveFill(false);
    }, 1000);

    showNotify();

    return () => clearTimeout(timer);
  };

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

  var formData = new FormData();
  formData.set("product_unique_id", id);

  const queryClient = useQueryClient();
  queryClient.invalidateQueries("product");

  const { isLoading, error, data, isFetching } = useQuery(["product"], () =>
    fetch(itemGet, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      })
  );

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;


  return (
    <div className="product-wrapper">
      <div className="header">
        <div className="category ">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2">{data.data.product_name}</div>
        </div>

        <div className="category ">
          <div className="object-2">
            <Share width={20} height={20} action={WebShare} />
          </div>
        </div>
      </div>

      <div className="main">
        <div className="wrapper">
          <div className="product-body">
            <div className="product-divide">
              <div className="product-image"></div>

              <Social width={22} height={25} />
            </div>

            <div className="product-detail  ">
              <div className="nameXauthor outline">
                <div className="nameXaction">
                  <div className="product-name "> {data.data.product_name}</div>

                  <div className="love " onClick={updateLove}>
                    {loveFill ? (
                      <LoveFill width={18} height={20} />
                    ) : (
                      <Love width={18} height={20} />
                    )}
                  </div>
                </div>

                <span className="product-author  ">
                  {" "}
                  {data.data.product_author}
                </span>

                <div className="prices">
                  <div className="product-price">
                    GHC {data.data.unit_price}
                  </div>

                  <div className="spacer"></div>

                  <span className="product-discount-price">GHC999</span>
                </div>
              </div>

              {width > 540 ? null : (
                <div className="rateItem outline">
                  <StarRating value={3.7} width={15} height={15} />
                </div>
              )}

              <div className="product-description-wrapper outline">
                <div className="product-title">Description</div>

                {width > 540 ? (
                  <div className="product-description-full">
                    {data.data.product_description}{" "}
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
                      {data.data.product_description}{" "}
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

              <div className="review-box outline">
                {width > 540 ? (
                  <div className="product-title ">Ratings and Reviews</div>
                ) : null}

                {width > 540 ? null : (
                  <div className="product-title ">Reviews</div>
                )}

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

                  <div className="see-more">
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
