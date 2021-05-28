import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import ProfilePhoto from "../Components/Profile Photo";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import User from "../Components/User";
import { MediaQuery } from "../helper";
import { useData } from "../Context";
import "./dropdown.css";

export default function Dropdown() {
  const breakpoint = 280;
  const history = useHistory();
  const { profileImage, logoutUser } = useData();
  const { width } = MediaQuery();
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  return (
    <div className="menu-container">
      <div onClick={onClick} className="menu-trigger">
        {/* <ProfilePhoto
          src={`https://okukus.com/${profileImage}`}
          className="User avatar"
        /> */}

        {/* <img
          src="https://via.placeholder.com/30x30.png?text=Okukus.com"
          alt="User avatar"
        /> */}
        <User
          width={breakpoint < width ? 30 : 20}
          height={breakpoint < width ? 30 : 20}
        />
      </div>

      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
      >
        <div>
          <div
            onClick={() => {
              history.push("/user/profile");
            }}
            className="dropdownItem"
          >
            Profile
          </div>
          <div
            onClick={() => {
              logoutUser();
              history.push("/");
            }}
            className="dropdownItem"
          >
            Logout
          </div>
        </div>
      </nav>
    </div>
  );
}
