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
import { MediaQuery, axiosMethod } from "../helper";
import { itemGet, okukus, cartAdd, buyerID, wishCreate } from "../endpoints";
import PlaceholderProduct from "./PlaceholderProduct";
import ProductView from "./Products View";

import "./product.css";

const Product = () => {
  let { id } = useParams();
  var formData = new FormData();
  formData.set("product_unique_id", id);

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

  return (
    <>{isLoading ? <PlaceholderProduct /> : <ProductView data={data} />}</>
  );
};

export default Product;
