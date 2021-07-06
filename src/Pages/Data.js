import { useState } from "react";
import { useLocalStorage } from "./helper";

const Data = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setUserEmail] = useState("");
  const [verfifcationStatus, setVerificationStatus] = useState(false);

  const [auth, setAuth] = useLocalStorage("loginToken", "");

  const [profileImage, setProfileImage] = useState(
    "https://i.redd.it/liptgenrd1b01.png"
  );

  function logoutUser() {
    setFirstName("");
    setLastName("");
    setUserEmail("");
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
    profileImage,

    setAuth,
    setFirstName,
    setLastName,
    setUserEmail,
    setVerificationStatus,
  };
};

export default Data;
