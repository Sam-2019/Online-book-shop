import { useState } from "react";
import axios from "axios";
import {
  okukus,
  cartSummary,
  orderHistory,
  wishList,
  buyerID,
  profileImageGet,
  itemsGet,
  itemGet,
  tagsGet,
  tagGet,
  userLogin,
  userRegister,
  userValidate,
  userPasswordUpdate,
  userProfileUpdate,
  userEmailUpdate,
  userAccountReset,
  userAccountVerify,
  userCreateEmailVerify,
  userReadEmailVerify,
  passwordReset,
  itemSearch,
  cartAdd,
  cartGet,
  cartCount,
  cartUpdate,
  cartDelete,
  cartCheckout,
  orderCreate,
  orderDetail,
  wishCreate,
  wishDelete,
  userWelcome,
  dev_site,
} from "./endpoints";
import { useQuery } from "react-query";

const instance = axios.create({
  baseURL: dev_site,
});

const axiosMethod = async (type, url, formData) => {
  const method = await axios({
    method: type,
    url: url,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return method;
};

const Data = () => {
  var formData = new FormData();
  formData.set("buyer_unique_id", buyerID);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [uniqueID, setUniqueID] = useState("");
  const [verfifcationStatus, setVerificationStatus] = useState("");

  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [profileImage, setProfileImage] = useState("");

  const [orderLength, setOrderLength] = useState(0);
  const [wishlistLength, setWishlistLength] = useState(0);

  const getItems = async () => {
    const data = await axiosMethod("post", itemsGet);
    return data;
  };

  async function getItem(formData) {
    const { data } = await axiosMethod("post", itemGet, formData);
    return data;
  }

  const getTags = async () => {
    const data = await axiosMethod("post", tagsGet);
    return data;
  };

  async function getTag(formData) {
    const { data } = await axiosMethod("post", tagGet, formData);
    return data;
  }

  async function logoutUser() {
    localStorage.removeItem("loginToken");
    localStorage.clear();
    setFirstName("");
    setLastName("");
    setEmail("");
    setUniqueID("");
    setVerificationStatus("");
  }

  async function loginUser(formData) {
    const { data } = await axiosMethod("post", userLogin, formData);
    return data;
  }

  async function registerUser(formData) {
    const { data } = await axiosMethod("post", userRegister, formData);
    return data;
  }

  async function isLoggedIn() {
    const loginToken = localStorage.getItem("loginToken");
    var formData = new FormData();

    formData.set("token", loginToken);

    if (loginToken) {
      //Adding JWT token to axios default header
      instance.defaults.headers.common["Authorization"] =
        "bearer " + loginToken;

      const { data } = await axiosMethod("post", userValidate, formData);

      if (data.validity === true && data.buyer === null) {
        localStorage.removeItem("loginToken");
      } else if (data.error === true) {
        localStorage.removeItem("loginToken");
      } else {
        return (
          setFirstName(data.buyer.firstname),
          setLastName(data.buyer.lastname),
          setEmail(data.buyer.email),
          setUniqueID(data.buyer.unique_id),
          setVerificationStatus(data.buyer.verification_status)
        );
      }
    } else return;
  }

  async function updateUserPassword(formData) {
    const { data } = await axiosMethod("post", userPasswordUpdate, formData);
    return data;
  }

  async function updateUserProfile(formData) {
    const { data } = await axiosMethod("post", userProfileUpdate, formData);

    if (data.error === false) {
      setFirstName(data.data.firstname);
      setLastName(data.data.lastname);
    }
    return data;
  }

  async function updateUserEmail(formData) {
    const { data } = await axiosMethod("post", userEmailUpdate, formData);

    if (data.error === false) {
      setEmail(data.data.email);
    }
    return data;
  }

  async function resetUserAccount(formData) {
    const { data } = await axiosMethod("post", userAccountReset, formData);
    return data;
  }

  async function verifyUserAccount(formData) {
    const { data } = await axiosMethod("post", userAccountVerify, formData);
    return data;
  }

  async function verifyCreateEmail(formData) {
    const { data } = await axiosMethod("post", userCreateEmailVerify, formData);
    return data;
  }

  async function verifyReadEmail(formData) {
    const readEmailVerify = await axiosMethod(
      "post",
      userReadEmailVerify,
      formData
    );
    return readEmailVerify;
  }

  async function userPasswordReset(formData) {
    const { data } = await axiosMethod("post", passwordReset, formData);
    return data;
  }

  async function searchItem(formData) {
    const { data } = await axiosMethod("post", itemSearch, formData);
    return data;
  }

  async function addCart(formData) {
    const { data } = await axiosMethod("post", cartAdd, formData);
    return data;
  }

  async function getCart(formData) {
    const { data } = await axiosMethod("post", cartGet, formData);
    return data;
  }

  async function countCart(formData) {
    const { data } = await axiosMethod("post", cartCount, formData);

    return data;
  }

  async function deleteCart(formData) {
    const { data } = await axiosMethod("post", cartDelete, formData);
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

  async function summaryCart(formData) {
    const { data } = await axiosMethod("post", cartSummary, formData);
    return data;
  }

  async function createOrder(formData) {
    const { data } = await axiosMethod("post", orderCreate, formData);
    return data;
  }

  async function historyOrder(formData) {
    const { data } = await axiosMethod("post", orderHistory, formData);
    return data;
  }

  async function detailOrder(formData) {
    const { data } = await axiosMethod("post", orderDetail, formData);
    return data;
  }

  async function createWish(formData) {
    const { data } = await axiosMethod("post", wishCreate, formData);
    return data;
  }

  async function deleteWish(formData) {
    const { data } = await axiosMethod("post", wishDelete, formData);
    return data;
  }

  async function welcomeUser(formData) {
    const { data } = await axiosMethod("post", userWelcome, formData);
    return data;
  }

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
    getItems,
    getItem,
    getTags,
    getTag,

    logoutUser,
    loginUser,
    registerUser,
    isLoggedIn,
    updateUserPassword,
    updateUserProfile,
    updateUserEmail,
    resetUserAccount,
    verifyUserAccount,

    verifyCreateEmail,
    verifyReadEmail,

    userPasswordReset,

    searchItem,

    addCart,
    getCart,
    countCart,
    deleteCart,
    updateCart,
    checkoutCart,
    summaryCart,

    createOrder,
    historyOrder,
    detailOrder,

    firstName,
    lastName,
    email,
    uniqueID,
    verfifcationStatus,

    createWish,
    deleteWish,

    welcomeUser,

    amount,
    quantity,
    profileImage,
    orderLength,
    wishlistLength,
  };
};

export default Data;
