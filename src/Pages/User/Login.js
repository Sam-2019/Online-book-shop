import React from "react";
import PropTypes from "prop-types";
import Back from "../Components/Back";
import Input from "../Components/Input";
import Button from "../Components/Button";
import Home from "../Components/Home";
import Message from "../Components/Message";
import "./user.css";

const Login = () => {
  return (
    <div className="user-wrapper">
      <div className="header ">
        <div className="category ">
          <div className="object-1">
            <Home width={30} height={30} />
          </div>
          <div className="object-2"> Login</div>
        </div>

        <div className="category ">
          <div className="object-2">
            <Button name="Signup" class_name="header-secondary" />
          </div>

          {/* <div className="">
            <Button name="Next" class_name="header-primary" />
          </div> */}
        </div>
      </div>

      <div className="main">
        <form className="form-wrapper ">
          <Input class_name="input " placeholder="Email" onChange />
          <Input class_name="input " placeholder="Password" onChange />

          <Message class_name="message " message="Hello" />

          <Button name="Login" class_name="primary" />
          {/* <Button name="Signup" class_name="secondary" /> */}
        </form>

        <div className="forgotten_password_wrapper  ">
          <span className="forgotten_password">Password forgotten?</span>
        </div>
      </div>
    </div>
  );
};
export default Login;
