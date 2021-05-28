import { useState, useEffect } from "react";
import { useLocalStorage } from "./helper";
import { useQuery } from "@apollo/client";
import { GET_USER } from "./graphQL functions";

const Data = () => {
  const [firstName, setFirstName] = useLocalStorage("firstName", "");
  const [lastName, setLastName] = useLocalStorage("lastName", "");
  const [email, setEmail] = useLocalStorage("email", "");
  const [uniqueID, setUniqueID] = useState("");
  const [verfifcationStatus, setVerificationStatus] = useState(false);

  const [auth, setAuth] = useLocalStorage("loginToken", "");

  const token = localStorage.getItem("loginToken");
  const id = localStorage.getItem("uniqueID");

  const [profileImage, setProfileImage] = useState(
    "https://i.redd.it/liptgenrd1b01.png"
  );

  const {
    loading,
    error,
    data: userInfo,
  } = useQuery(GET_USER, {
    variables: { id: id },
  });

  useEffect(() => {
    let didCancel = false;

    // function verify() {
    if (userInfo) {
      setVerificationStatus(userInfo.user.verify);
    }

    if (token && id) {
      setAuth(true);
      setUniqueID(id);
    }

    // verify();

    return () => {
      didCancel = true;
    };
  }, [userInfo]);

  function logoutUser() {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("uniqueID");
    setFirstName("");
    setLastName("");
    setEmail("");
    setUniqueID("");
    setVerificationStatus("");
    setAuth(false);
    setProfileImage("");
  }

  function login(data) {
    localStorage.setItem("loginToken", data.login.token);
    localStorage.setItem("uniqueID", data.login.user);

    if (data) {
    }
  }

  return {
    auth,
    logoutUser,
    login,

    firstName,
    lastName,
    email,
    uniqueID,
    verfifcationStatus,

    profileImage,
  };
};

export default Data;
