import { useState, useEffect } from "react";
import { useLocalStorage } from "./helper";
import { useQuery } from "@apollo/client";
import { GET_USER } from "./graphQL functions";

const Data = () => {
  const [auth, setAuth] = useLocalStorage("loginToken", "");
  const [firstName, setFirstName] = useLocalStorage("firstName", "");
  const [lastName, setLastName] = useLocalStorage("lastName", "");
  const [email, setEmail] = useLocalStorage("email", "");
  const [uniqueID, setUniqueID] = useLocalStorage("uniqueID", "");
  const [verfifcationStatus, setVerificationStatus] = useState(false);

  const [profileImage, setProfileImage] = useState(
    "https://i.redd.it/liptgenrd1b01.png"
  );

  const {
    loading,
    error,
    data: userInfo,
  } = useQuery(GET_USER, {
    variables: { id: uniqueID },
  });

  useEffect(() => {
    let didCancel = false;

    function verify() {



      if (userInfo) {
        setVerificationStatus(userInfo.user.verify);
      }
    }

    console.log(verfifcationStatus)

    verify();

    return () => {
      didCancel = true;
    };
  }, [userInfo]);

  async function logoutUser() {
    localStorage.removeItem("loginToken");
    localStorage.clear();
    setFirstName("");
    setLastName("");
    setEmail("");
    setUniqueID("");
    setVerificationStatus("");
    setAuth(!auth);
    setProfileImage("");
  }

  async function login(data) {
    await localStorage.setItem("loginToken", data.login.token);
    await localStorage.setItem("uniqueID", data.login.user);

    if (data) {
      setAuth();
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
