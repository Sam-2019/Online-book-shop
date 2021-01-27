import React from "react";
import PropTypes from "prop-types";
import Back from "../Components/Back";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Message from "../Components/Message";
import "./user.css";

const Password = () => {
  return (
    <div className="user-wrapper">
      <div className="header ">
        <div className="category ">
          <div className="object-2"> New Password</div>
        </div>

        <div className="category ">
          <div className="object-2">
            <Button name="Login" class_name="header-secondary" />
          </div>
        </div>
      </div>

      <div className="main">
        <form className="form-wrapper ">
          <Input class_name="input " placeholder="New Password" onChange />
          <Input class_name="input " placeholder="Confirm Password" onChange />

          <Message class_name="message " message="Hello" />

          <Button name="Submit" class_name="primary" />
          {/* <Button name="Signup" class_name="secondary" /> */}
        </form>
      </div>
    </div>
  );
};
export default Password;
