import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Back from "../Components/Back";
import Pen from "../Components/Pen";
import "./profile.css";

const AccountVerify = () => {
  let history = useHistory();

  return (
    <div className="user-wrapper">
      
      <div className="header ">
        <div className="category ">
          <div className="object-1">
            <Back
              width={30}
              height={30}
              action={() => {
                window.history.back();
              }}
            />
          </div>
          <div className="object-2"> Profile</div>
        </div>
      </div>

      <div className="main ">

        <div className="user-detail ">
          <div className="category ">
            <div className="object-5">
              <div className="user-image  "></div>
            </div>

            <div className="nameXeditXverify  ">
              <div className="nameXedit ">
                <div className="user-name">Samuel Martey Akandor</div>
                <Pen width="15" height="15" />
              </div>

              <div className="user-verify">
                <div className="verify">Verified</div>
              </div>
            </div>
          </div>
        </div>

        <div className="options">
          <div className="option-list" onClick={() => {}}>
            Account
          </div>
          <div
            className="option-list"
            onClick={() => {
              history.push("/user/orderhistory");
            }}
          >
            Order History
          </div>
          <div
            className="option-list"
            onClick={() => {
              history.push("/user/wishlist");
            }}
          >
            Wish List
          </div>
          <div className="option-list" onClick={() => {}}>
            Change Password
          </div>

          <div className="option-list" onClick={() => {}}>
            Customer Service
          </div>

          <div className="option-list" onClick={() => {}}>
            Invite a friend
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccountVerify;
