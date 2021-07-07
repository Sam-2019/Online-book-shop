import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Home from "../Components/Home";
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
import AddReview from "../Review/addReview";
import Summary from "../Summary/Summary";
import { MediaQuery } from "../helper";
import { Spacer } from "../Placeholders/Product";
import { useData } from "../Context";
import "./product.css";

import {
  ADD_CART,
  ADD_WISHLIST,
  GET_CART,
  GET_WISHLIST,
} from "../graphQL functions";

toast.configure();

const Product = ({ results }) => {
  const [addCart, { loading: cartLoading, error: cartError, data: cartData }] =
    useMutation(ADD_CART, {
      refetchQueries: [{ query: GET_CART }],
    });

  const [
    addWishlist,
    { loading: wishLoading, error: wishError, data: wishData },
  ] = useMutation(ADD_WISHLIST, {
    refetchQueries: [{ query: GET_WISHLIST }],
  });

  const { width } = MediaQuery();
  const { auth } = useData();

  let history = useHistory();
  let { sku } = useParams();
  let { url } = useRouteMatch();

  const [loading, setLoading] = React.useState(false);
  const [contractDescription, expandDescription] = React.useState(true);
  const [reviewbox, setReviewBox] = React.useState(false);
  const [loveFill, setLoveFill] = React.useState(false);

  const ToggleDescription = () => {
    expandDescription(!contractDescription);
  };

  const WebShare = (event) => {
    event.preventDefault();
    const title = "google.com";

    let url = document.location.href;
    const canonicalElement = document.querySelector("link[rel=canonical]");

    if (navigator.share) {
      if (canonicalElement !== null) {
        url = canonicalElement.href;
      }

      navigator
        .share({
          title: title,
          text: "Check us out for all your book needs",
          url,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
  };

  const add2Cart = async () => {
    if (auth === "") {
      return toast.error("Please login to add item to cart");
    }

    addCart({
      variables: {
        product: String(results.id),
        quantity: String(1),
        price: String(results.price),
      },
    });

    if (cartError) {
      toast.error(cartError);
    }

    if (cartData) {
      toast.success("Item added to cart");
    }
  };

  const add2WL = async (e) => {
    e.preventDefault();

    if (auth === "") {
      return toast.error("Please login to add item to wishlist");
    }

    setLoveFill(true);

    addWishlist({
      variables: {
        product: String(results.id),
      },
    });

    if (wishError) {
      toast.error(wishError);
    }

    toast.success("Item added to wish list");

    const timer = setTimeout(() => {
      setLoveFill(false);
    }, 2000);
    return () => clearTimeout(timer);
  };

  const reviewItem = () => {
    if (auth === "") {
      return toast.error("Please login to review item");
    }

    if (wishError) {
      toast.error(wishError);
    }

    setReviewBox(true);
  };

  const buyItem = () => {
    if (auth === "") {
      return toast.error("Please login to buy item");
    }

    history.push(`/order/${sku}`);
  };

  const productRating = parseFloat(results.rating.toFixed(2));

  return (
    <div className="product-wrapper">
      <div className="header">
        <div className="category ">
          <div className="object-1">
            <Home width={30} height={30} />
          </div>
          <div className="object-2">{results.sku}</div>
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
              <div className="product-image-wrapper">
                <img
                  src={results.imageURL}
                  alt="peecha"
                  className="product-image"
                />
              </div>

              <Social
                width={22}
                height={25}
                postTitle={results.name}
                postUrl={`https://okukus.com/product/${results.sku}`}
                hashtags="okukus, okukusBooks, books, shopOkukus, shop@Okukus, okukus.com"
                via
              />
            </div>

            <div className="product-detail  ">
              <div className="nameXauthor outline">
                <div className="nameXaction">
                  <div className="product-name ">{results.name}</div>

                  <div className="love " onClick={add2WL}>
                    {loveFill ? (
                      <LoveFill width={18} height={20} />
                    ) : (
                      <Love width={18} height={20} />
                    )}
                  </div>
                </div>

                <span className="product-author  ">{results.author}</span>

                <div className="prices">
                  <div className="product-price">$ {results.price}</div>

                  <div className="spacer"></div>

                  {/* <span className="product-discount-price">GHC999</span> */}
                </div>
              </div>

              {width > 540 ? null : (
                <div className="rateItem outline">
                  {productRating === 0 ? (
                    "No yet ratings yet"
                  ) : (
                    <StarRating
                      value={productRating}
                      width={15}
                      height={15}
                      type="product-rating"
                    />
                  )}
                </div>
              )}

              <div className="product-description-wrapper outline">
                <div className="product-title">Description</div>

                {width > 540 ? (
                  <div className="product-description-full">
                    {results.detail}
                  </div>
                ) : (
                  <Fragment>
                    <div
                      className={
                        contractDescription
                          ? "product-description"
                          : "product-description-full"
                      }
                    >
                      {results.detail}
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
                  </Fragment>
                )}
              </div>

              <div className="review-box outline">
                {width > 540 && (
                  <div className="product-title ">Ratings and Reviews</div>
                )}

                {width > 540 ? null : (
                  <div className="product-title ">Reviews</div>
                )}

                <div className="add-review-wrapper">
                  {width > 540 ? null : (
                    <div className="addReview2 " onClick={reviewItem}>
                      Add Review
                    </div>
                  )}

                  {width > 540 && (
                    <div className="rating-stars">
                      {productRating === 0 ? (
                        "No ratings yet"
                      ) : (
                        <StarRating
                          value={productRating}
                          width={15}
                          height={15}
                          type="product-rating"
                        />
                      )}
                    </div>
                  )}

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

              <div>
                {results.review.slice(0, 3).map((item, index) => (
                  <ReviewItem key={index} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {reviewbox && (
        <PopUp close={() => setReviewBox(false)}>
          <AddReview
            close={() => {
              setReviewBox(false);
            }}
            user={auth}
            product={results.id}
          />
        </PopUp>
      )}

      <Summary>
        {width > 540 && (
          <div className="addReview2 " onClick={reviewItem}>
            Add Review
          </div>
        )}

        <div className="product-action">
          <Button
            name="Add to Cart"
            class_name="addCart"
            action={add2Cart}
            loading={loading}
          />

          <Spacer />

          <Button name="Buy Now" class_name="buyNow" action={buyItem} />
        </div>
      </Summary>
    </div>
  );
};

export default Product;

Product.propTypes = {
  results: PropTypes.object,
  id: PropTypes.string,
  user: PropTypes.string,
  product: PropTypes.string,
  price: PropTypes.string,
  quantity: PropTypes.string,
};
