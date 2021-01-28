import React from "react";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import Notify from "../Notify/Notify";
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

const Product = () => {
  let history = useHistory();
  let { id } = useParams();

  let { url } = useRouteMatch();

  const [notify, setNotify] = React.useState(false);
  const [contractDescription, expandDescription] = React.useState(true);
  const [review, addReview] = React.useState(true);

  const showNotify = () => {
    setNotify(true);

    const timer = setTimeout(() => {
      setNotify(false);
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
        .then(() => {
          console.log("Thnks for sharing");
        });
    } else {
    }
  };

  return (
    <div className="product-wrapper ">
      <div className="header ">
        <div className="category ">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2"> The book</div>
        </div>
      </div>

      <div className="main ">
        <div className="wrapper">
          <div className="product-wrapper  ">
            <div className="product-body  ">
              <div className="product-image "></div>

              <div className="product-detail  ">
                <div className="product-name">Name</div>

                <div className="author-wrapper">
                  <span className="by"> by</span>
                  <span className="product-author ">Author</span>
                </div>

                <div className="priceXqytXreview ">
                  <div className="product-quantity  ">Qty</div>
                  <div className="line "></div>
                  <div className="product-price">Price</div>
                </div>

                <div className="share-social ">
                  <div className="shareXicon" onClick={WebShare}>
                    <Share width={15} height={15} />

                    <div className="share">Share</div>
                  </div>

                  {/* <Social width={26} height={26} postTitle postUrl hashtags /> */}
                </div>

                <div className="product-description-wrapper">
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
                      <Down width={18} height={20} action={ToggleDescription} />
                    ) : (
                      <Up width={18} height={20} action={ToggleDescription} />
                    )}
                  </div>
                </div>

                <div className="rating-wrapper">
                  <div className="numberXstars">
                    {/* <div className="rating-number">4.9</div> */}

                    <div className="rating-stars">
                      <StarRating value={3.7}  />
                    </div>
                  </div>

                  <div className="review-numbersXright">64 Reviews</div>
                </div>

                {Array(1)
                  .fill()
                  .map((item, index) => (
                    <ReviewItem key={index} />
                  ))}

                <div className=" addReviewXseeMore">
                  <div
                    className=" addReview"
                    onClick={() => {
                      addReview(true);
                    }}
                  >
                    Add Review
                  </div>

                  <div className=" see-more">
                    <div
                      className="review-numbersXright"
                      onClick={() => {
                        history.push(`${url}/review`);
                      }}
                    >
                      See All Reviews
                    </div>
                    <Right width={20} height={20} />
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

            <div className="product-action ">
              <Button
                name="Add to Cart"
                class_name="addCart"
                action={showNotify}
              />
              <Button
                name="Buy Now"
                class_name="buyNow"
                action={() => {
                  history.push(`/order/${id}`);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {notify ? (
        <Notify message="Item added to cart" close={() => setNotify(false)} />
      ) : null}
    </div>
  );
};

export default Product;
