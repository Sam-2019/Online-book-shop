import React from "react";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import Back from "../Components/Back";
import Up from "../Components/Up";
import Down from "../Components/Down";
import Right from "../Components/Right";
import Social from "../Components/Social";
import Button from "../Components/Button";
import ReviewItem from "../Review/reviewItem";
import "./product.css";

const Product = () => {
  let history = useHistory();
  let { id } = useParams();

  let { url } = useRouteMatch();
  const [contractDescription, expandDescription] = React.useState(true);

  const ToggleDescription = () => {
    expandDescription(!contractDescription);
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

                <div className="share-social  ">
                  <div className="">Share</div>

                  <Social width={26} height={26} postTitle postUrl hashtags />
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
                    <div className="rating-number">4.9</div>
                    <div className="rating-stars">********</div>
                  </div>

                  <div className="review-numbersXright">64 Reviews</div>
                </div>

                {Array(1)
                  .fill()
                  .map((item, index) => (
                    <ReviewItem key={index} />
                  ))}

                <div
                  className=" see-more"
                  onClick={() => {
                    history.push(`${url}/review`);
                  }}
                >
                  <div className="review-numbersXright">See All Reviews</div>
                  <Right width={20} height={20} />
                </div>
              </div>
            </div>

            <div className="product-action">
              <Button name="Add to Cart" class_name="addCart" />
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
    </div>
  );
};

export default Product;
