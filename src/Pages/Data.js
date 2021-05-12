import { useState } from "react";
import axios from "axios";
import {
  userValidate,
  userAccountVerify,
  cartCheckout,
  orderCreate,
  userWelcome,
  dev_site,
} from "./endpoints";

import { axiosMethod, fetch, useLocalStorage } from "./helper";
import image from "./Placeholders/250x350.png";

const instance = axios.create({
  baseURL: dev_site,
});

const Data = () => {
  const [auth, setAuth] = useLocalStorage("loginToken", "");
  const [firstName, setFirstName] = useLocalStorage("firstName", "");
  const [lastName, setLastName] = useLocalStorage("lastName", "");
  const [email, setEmail] = useLocalStorage("email", "");
  const [uniqueID, setUniqueID] = useLocalStorage("uniqueID", "");
  const [verfifcationStatus, setVerificationStatus] = useState(false);

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
    setAuth(!auth);
    setProfileImage(image);
    setQuantity(0);
    setAmount(0);
    setOrderLength(0);
    setWishlistLength(0);
  }

  async function isLoggedIn() {
    const loginToken = localStorage.getItem("loginToken");
    var formData = new FormData();

    formData.set("token", loginToken);

    if (!loginToken) return;

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
    );
  }

  async function verifyUserAccount(formData) {
    const data = await fetch(userAccountVerify, formData);
    return data;
  }

  async function checkoutCart(formData) {
    const { data } = await axiosMethod("post", cartCheckout, formData);
    console.log(data);
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

  return {
    auth,
    logoutUser,
    isLoggedIn,

    verifyUserAccount,

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
