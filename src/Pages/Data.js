import { useState } from "react";
import { useLocalStorage } from "./helper";

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

  return {
    auth,
    logoutUser,

    firstName,
    lastName,
    email,
    uniqueID,
    verfifcationStatus,

    profileImage,
  };
};

export default Data;
