import { useState } from "react";
import { useLocalStorage } from "./helper";

const Data = () => {
  const [auth, setAuth] = useLocalStorage("loginToken", "");

  const [profileImage, setProfileImage] = useState(
    "https://i.redd.it/liptgenrd1b01.png"
  );

  function logoutUser() {
    setAuth("");
    setProfileImage("");
  }

  return {
    auth,
    setAuth,
    logoutUser,
    profileImage,
  };
};

export default Data;
