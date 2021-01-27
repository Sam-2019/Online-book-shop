import React from "react";
import PropTypes from "prop-types";
import Back from "../Components/Back";
import {Input} from "../Components/Input";
import Button from "../Components/Button";
import Home from "../Components/Home";
import Message from "../Components/Message";
import Success from "../Components/Success";
import "./user.css";

const UserVerify = () => {
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
          <div className="object-2"> User Verify</div>
        </div>
      </div>

      <div className="main">

      <Message class_name="message " message="Hello" />
      
        <Success />
      </div>
    </div>
  );
};
export default UserVerify;
