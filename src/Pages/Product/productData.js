import React from "react";
import PropTypes from "prop-types";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import Back from "../Components/Back";
import Home from '../Components/Home'
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
import { MediaQuery, axiosMethod } from "../helper";
import { okukus, cartAdd, buyerID, wishCreate } from "../endpoints";
import { useData } from "../Context";
import { Spacer } from "../Placeholders/Product";
import "./product.css";


toast.configure();

const Product = ({ data }) => {
  let history = useHistory();
  let { id } = useParams();
  let { url } = useRouteMatch();

  const { auth } = useData();

  const { width } = MediaQuery();

  const [loading, setLoading] = React.useState(false);
  const [contractDescription, expandDescription] = React.useState(true);
  const [review, addReview] = React.useState(false);
  const [loveFill, setLoveFill] = React.useState(false);
  const [reviewData, setReviewData] = React.useState([]);

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

  const queryClient = useQueryClient();
  queryClient.invalidateQueries("product");

  var formData = new FormData();
  formData.set("product_unique_id", id);
  formData.set("buyer_unique_id", buyerID);

  const add2Cart = async (e) => {
    e.preventDefault();
    if (auth) {
      setLoading(true);

      const { data } = await axiosMethod("post", cartAdd, formData);

      if (!data.error) {
        queryClient.invalidateQueries("carts");
        queryClient.invalidateQueries("summaryData");
        queryClient.invalidateQueries("orderLength");
        toast.success(data.message);
      }

      setLoading(false);
      toast.error(data.error);
    }
  };

  const add2WL = async (e) => {
    e.preventDefault();
    if (auth) {
      setLoveFill(false);

      const { data } = await axiosMethod("post", wishCreate, formData);

      if (!data.error) {
        setLoveFill(true);
        toast.success(data.message);
        queryClient.invalidateQueries("wishlistLength");
        queryClient.invalidateQueries("wishlist");
      }

      toast.error(data.error);

      const timer = setTimeout(() => {
        setLoveFill(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  };

  const reviewItem = () => {
    if (!auth) {
      toast.warning("Login to write a review ");
    }

    if (auth) {
      addReview(true);
    }
  };

  const buyItem = () => {
    if (auth) {
      history.push(`/order/${id}`);
    }

    if (!auth) {
      toast.warning("Login to buy item ");
    }
  };

  return (
    <div className="product-wrapper">
      <div className="header">
        <div className="category ">
          <div className="object-1">
            <Home width={30} height={30} />
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
              <div className="product-image-wrapper">
                <img
                  src={`${okukus}/${data.data.cover_photo_url}`}
                  alt="peecha"
                  className="product-image"
                />
              </div>

              <Social
                width={22}
                height={25}
                postTitle={data.data.product_name}
                postUrl={`https://okukus.com/product/${id}`}
                hashtags="okukus, okukusBooks, books, shopOkukus, shop@Okukus, okukus.com"
                via
              />
            </div>

            <div className="product-detail  ">
              <div className="nameXauthor outline">
                <div className="nameXaction">
                  <div className="product-name "> {data.data.product_name}</div>

                  <div className="love " onClick={add2WL}>
                    {loveFill ? (
                      <LoveFill width={18} height={20} />
                    ) : (
                      <Love width={18} height={20} />
                    )}
                  </div>
                </div>

                <span className="product-author  ">
                  {data.data.product_author}
                </span>

                <div className="prices">
                  <div className="product-price">
                    GHC {data.data.unit_price}
                  </div>

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
                    <div className="addReview2 " onClick={reviewItem}>
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

              <div>
                {reviewData ? (
                  <>
                    {reviewData.slice(0, 2).map((item, index) => (
                      <ReviewItem key={index} {...item} />
                    ))}
                  </>
                ) : null}
              </div>
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

      <Summary>
        {width > 540 ? (
          <div className="addReview2 " onClick={reviewItem}>
            Add Review
          </div>
        ) : null}

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
  data: PropTypes.object,
};
