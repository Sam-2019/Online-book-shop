import { useState } from "react";
import axios from "axios";
import {
  okukus,
  cartSummary,
  orderHistory,
  wishList,
  buyerID,
  profileImageGet,
} from "./endpoints";

import { useQuery } from "react-query";

const Data = () => {
  var formData = new FormData();
  formData.set("buyer_unique_id", buyerID);

  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [profileImage, setProfileImage] = useState("");

  const [orderLength, setOrderLength] = useState(0);
  const [wishlistLength, setWishlistLength] = useState(0);

  useQuery("summaryData", () =>
    axios({
      method: "POST",
      url: cartSummary,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((data) => {
        if (data.data.message === "cart is empty") {
        } else {
          setQuantity(Number(data.data.data.total_quantity));
          setAmount(Number(data.data.data.total_amount));
          // console.log("Success:", data.data.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
  );

  useQuery("userImage", () =>
    axios({
      method: "POST",
      url: profileImageGet,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((data) => {
        if (data.data.message === "account not found") {
        } else {
          setProfileImage(`${okukus}/${data.data.data.profile_photo_url}`);
          // console.log("Success:", data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
  );

  useQuery("orderLength", () =>
    axios({
      method: "POST",
      url: orderHistory,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((data) => {
        if (data.data.message === "cart is empty") {
        } else {
          setOrderLength(Number(data.data.data.length));
          //    console.log("Success:", data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
  );

  useQuery("wishlistLength", () =>
    axios({
      method: "POST",
      url: wishList,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((data) => {
        if (data.data.message === "cart is empty") {
        } else {
          setWishlistLength(Number(data.data.data.length));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
  );

  

  return {
    amount,
    quantity,
    profileImage,
    orderLength,
    wishlistLength,
  };
};

export default Data;
