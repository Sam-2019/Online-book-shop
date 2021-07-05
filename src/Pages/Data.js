import { useState, useEffect } from "react";
import { useLocalStorage } from "./helper";
import { useQuery } from "@apollo/client";
import { GET_USER } from "./graphQL functions";

const Data = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [verfifcationStatus, setVerificationStatus] = useState(false);

  const [auth, setAuth] = useLocalStorage("loginToken", "");

  const [profileImage, setProfileImage] = useState(
    "https://i.redd.it/liptgenrd1b01.png"
  );

  const { data } = useQuery(GET_USER);

  console.log(data);

  useEffect(() => {
    let didCancel = false;

    // function verify() {
    // if (userInfo) {
    //   setVerificationStatus(userInfo.user.verified);
    //   setFirstName(userInfo.user.firstName);
    //   setLastName(userInfo.user.lastName);
    //   setEmail(userInfo.user.email);
    // }

    // verify();

    return () => {
      didCancel = true;
    };
  }, []);

  function logoutUser() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setVerificationStatus("");
    setAuth("");
    setProfileImage("");
  }

  return {
    auth,
    logoutUser,
    firstName,
    lastName,
    email,
    verfifcationStatus,
    setAuth,
    profileImage,
  };
};

export default Data;
