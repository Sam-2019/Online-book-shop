import React from "react";
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
import { reviewData } from "../Review/reviewData";
import "./product.css";

import { ADD_CART, ADD_WISHLIST } from "../graphQL functions";

toast.configure();

const Product = ({ results }) => {
  const [addCart, { loading: cartLoading, error: cartError, data: cartData }] =
    useMutation(ADD_CART);

  const [
    addWishlist,
    { loading: wishLoading, error: wishError, data: wishData },
  ] = useMutation(ADD_WISHLIST);
  const { width } = MediaQuery();

  const { uniqueID } = useData();
  let history = useHistory();
  let { sku } = useParams();
  let { url } = useRouteMatch();

  const [loading, setLoading] = React.useState(false);
  const [contractDescription, expandDescription] = React.useState(true);
  const [review, addReview] = React.useState(false);
  const [loveFill, setLoveFill] = React.useState(false);

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
          url,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
  };

  // console.log(results.id);
  // console.log(typeof "609bfb663aef9216e4528eed");
  //  console.log(typeof results.id);
  //  console.log(typeof results.quantity);
  // console.log(typeof results.price);

  const add2Cart = async () => {
    addCart({
      variables: {
        user: String(uniqueID),
        product: String(results.id),
        quantity: String(1),
        price: String(results.price),
      },
    });

    if (cartError) {
      toast.error(cartError);
    }

    toast.success("Item added to cart");
  };

  const add2WL = async (e) => {
    e.preventDefault();
    setLoveFill(true);

    addWishlist({
      variables: {
        user: String(uniqueID),
        product: String(results.id),
      },
    });

    if (wishError) {
      toast.error(wishError);
    }

    const timer = setTimeout(() => {
      setLoveFill(false);
      toast.success("Item added to wish list");
    }, 2000);
    return () => clearTimeout(timer);
  };

  const reviewItem = () => {
    addReview(true);
  };

  const buyItem = () => {
    history.push(`/order/${sku}`);
  };

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
                  <StarRating value={3.7} width={15} height={15} />
                </div>
              )}

              <div className="product-description-wrapper outline">
                <div className="product-title">Description</div>

                {width > 540 ? (
                  <div className="product-description-full">
                    {results.detail}
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
                  </>
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
                      <StarRating value={3.7} width={15} height={15} />
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
                {reviewData && (
                  <>
                    {reviewData.slice(0, 2).map((item, index) => (
                      <ReviewItem key={index} {...item} />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {review && (
        <PopUp close={() => addReview(false)}>
          <AddReview
            close={() => {
              addReview(false);
            }}
            user={uniqueID}
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
