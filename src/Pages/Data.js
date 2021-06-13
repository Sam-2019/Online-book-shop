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

  const { data: userInfo } = useQuery(GET_USER, {
    variables: { id: id },
  });

  useEffect(() => {
    let didCancel = false;

    // function verify() {
    if (userInfo) {
      setVerificationStatus(userInfo.user.verified);
      setFirstName(userInfo.user.first_name);
      setLastName(userInfo.user.last_name);
      setEmail(userInfo.user.email);
    }

    if (token && id) {
      setAuth(true);
      setUniqueID(id);
    }

    // verify();

    return () => {
      didCancel = true;
    };
  }, [userInfo, id, setAuth, setFirstName, setLastName, setEmail, token]);

  function logoutUser() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setUniqueID("");
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
    uniqueID,
    verfifcationStatus,
    setAuth,
    setUniqueID,

    profileImage,
  };
};

export default Data;
