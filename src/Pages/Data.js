import { useState } from "react";
import axios from "axios";
import {
  okukus,
  dev_site,
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
  cartSummary,
  orderCreate,
  orderHistory,
  orderDetail,
  wishCreate,
  wishList,
  wishDelete,
  userWelcome,
  buyerID,
  profileImageGet,
} from "./endpoints";
import { axiosMethod, useLocalStorage } from "./helper";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "react-query";

//Try destructring the responses i.e. {data}

const instance = axios.create({
  baseURL: dev_site,
});

const Data = () => {
  var formData = new FormData();
  formData.set("buyer_unique_id", buyerID);

  const [amount, setAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [profileImage, setProfileImage] = useState("");

  const queryClient = useQueryClient();

  async function summaryCart(formData) {
    const { data } = await axiosMethod("post", cartSummary, formData);

    if (data) {
    } else {
      return;
    }
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

  return {
    summaryCart,
    amount,
    quantity,
    profileImage,
  };
};

export default Data;
