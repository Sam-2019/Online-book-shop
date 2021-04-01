import React, { useState } from "react";
import axios from "axios";
import {
  cartSummary,
  orderHistory,
  wishList,
  profileImageGet,
  userValidate,
  userProfileUpdate,
  userEmailUpdate,
  userAccountReset,
  userAccountVerify,
  userCreateEmailVerify,
  cartUpdate,
  cartCheckout,
  orderCreate,
  userWelcome,
  dev_site,
} from "./endpoints";
import { useQuery } from "react-query";
import { axiosMethod, fetch, useLocalStorage } from "./helper";
import image from "./Placeholders/250x350.png";

const instance = axios.create({
  baseURL: dev_site,
});

const Data = () => {
  const [auth, setAuth] = useLocalStorage("loginToken", "");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [uniqueID, setUniqueID] = useState("");
  const [verfifcationStatus, setVerificationStatus] = useState("");

  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [profileImage, setProfileImage] = useState(image);

  const [orderLength, setOrderLength] = useState(0);
  const [wishlistLength, setWishlistLength] = useState(0);

  var formData = new FormData();
  formData.set("buyer_unique_id", uniqueID);

  async function logoutUser() {
    localStorage.removeItem("loginToken");
    localStorage.clear();
    setFirstName("");
    setLastName("");
    setEmail("");
    setUniqueID("");
    setVerificationStatus("");
    setProfileImage(image);
  }

  async function isLoggedIn() {
    const loginToken = localStorage.getItem("loginToken");
    var formData = new FormData();

    formData.set("token", loginToken);

    if (!loginToken) return;

    //Adding JWT token to axios default header
    instance.defaults.headers.common["Authorization"] = "bearer " + loginToken;

    const data = await fetch(userValidate, formData);


    if (data.validity === true && data.buyer === null) {
      localStorage.removeItem("loginToken");
    }

    if (data.error === true) {
      localStorage.removeItem("loginToken");
    }

    return (
      setAuth((prevAuth) => !prevAuth),
      setFirstName(data.buyer.firstname),
      setLastName(data.buyer.lastname),
      setEmail(data.buyer.email),
      setUniqueID(data.buyer.unique_id),
      setVerificationStatus(data.buyer.verification_status)
      //setProfileImage(data.buyer.unique_id)
    );
  }

  async function updateUserProfile(formData) {
    const data = await fetch(userProfileUpdate, formData);

    if (data.error === false) {
      setFirstName(data.data.firstname);
      setLastName(data.data.lastname);
    }
    return data;
  }

  async function updateUserEmail(formData) {
    const data = await fetch(userEmailUpdate, formData);

    if (data.error === false) {
      setEmail(data.data.email);
    }
    return data;
  }

  async function resetUserAccount(formData) {
    const data = await fetch(userAccountReset, formData);
    return data;
  }

  async function verifyUserAccount(formData) {
    const data = await fetch(userAccountVerify, formData);
    return data;
  }

  async function verifyCreateEmail(formData) {
    const data = await fetch(userCreateEmailVerify, formData);
    return data;
  }

  async function updateCart(formData) {
    const { data } = await axiosMethod("post", cartUpdate, formData);
    return data;
  }

  async function checkoutCart(formData) {
    const { data } = await axiosMethod("post", cartCheckout, formData);
    return data;
  }

  async function createOrder(formData) {
    const { data } = await axiosMethod("post", orderCreate, formData);
    return data;
  }

  async function welcomeUser(formData) {
    const { data } = await axiosMethod("post", userWelcome, formData);
    return data;
  }

  useQuery("summaryData", () =>
    axiosMethod("post", cartSummary, formData)
      .then((data) => {
    ;
        if (
          data.data.message === "cart is empty" ||
          "no value for post variable"
        ) {
          setQuantity(0);
          setAmount(0);
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

  useQuery("orderLength", () =>
    axiosMethod("post", orderHistory, formData)
      .then((data) => {
    ;
        if (
          data.data.message === "cart is empty" ||
          "no value for post variable"
        ) {
          setOrderLength(0);
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
    axiosMethod("post", wishList, formData)
      .then((data) => {
    ;
        if (
          data.data.message === "cart is empty" ||
          "no value for post variable"
        ) {
          setWishlistLength(0);
        } else {
          setWishlistLength(Number(data.data.data.length));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
  );

  useQuery("profileImage", () =>
    axiosMethod("post", profileImageGet, formData)
      .then((data) => {
        if (data.data.message === "account found") {
          setProfileImage(data.data.data.profile_photo_url);
        } else {
          setProfileImage(image);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
  );

  //const cartData = useAsync(cartSummary, formData);
  // console.log(cartData);

  return {
    auth,
    logoutUser,
    isLoggedIn,

    updateUserProfile,
    updateUserEmail,
    resetUserAccount,
    verifyUserAccount,

    verifyCreateEmail,

    updateCart,
    checkoutCart,

    createOrder,

    firstName,
    lastName,
    email,
    uniqueID,
    verfifcationStatus,

    welcomeUser,

    amount,
    quantity,
    profileImage,
    orderLength,
    wishlistLength,
  };
};

export default Data;
