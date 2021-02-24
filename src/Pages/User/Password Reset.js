import React from "react";
import PropTypes from "prop-types";
import Back from "../Components/Back";
import {Input} from "../Components/Input";
import Button from "../Components/Button";
import Message from "../Components/Message";
import "./user.css";

const PasswordReset = () => {
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
          <div className="object-2">Reset your password</div>
        </div>

        <div className="category ">
          <div className="object-2"></div>
        </div>
      </div>

      <div className="main">
        <form className="form-wrapper outline login-box ">
          <Input class_name="input " placeholder="Email" onChange />

          <Message class_name="message " message="Hello" />

          <Button name="Send password reset email" class_name="primary" />

          {/* <Button name="Return to sign in" class_name="secondary" /> */}
          {/* <Button name="Signup" class_name="secondary" /> */}
        </form>
      </div>
    </div>
  );
};
export default PasswordReset;
