import React from "react";
import { useHistory } from "react-router-dom";
import Back from "../Components/Back";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import Message from "../Components/Message";
import { MediaQuery } from "../helper";
import "./user.css";

const Login = () => {
  let history = useHistory();
  const breakpoint = 540;
  const { width } = MediaQuery();
  return (
    <div className="user-wrapper">
      <div className="header ">
        <div className="category ">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2"> Login</div>
        </div>

        <div className="category ">
          <div className="object-2">
            <Button
              name="Signup"
              class_name="header-secondary"
              action={() => {
                history.push("/signup");
              }}
            />
          </div>

          {/* <div className="">
            <Button name="Next" class_name="header-primary" />
          </div> */}
        </div>
      </div>

      <div className="main">
        <form className="form-wrapper">
          <Input class_name="input " placeholder="Email" onChange />
          <Input class_name="input " placeholder="Password" onChange />

          <div className="forgotten_password_wrapper">
            <span
              className="forgotten_password "
              onClick={() => {
                history.push("/account/reset");
              }}
            >
              Password forgotten?
            </span>
          </div>

          {/* <Message class_name="message " message="Hello" /> */}

          <Button name="Login" class_name="primary" />

          {width > breakpoint ? (
            <Button
              name="Signup"
              class_name="secondary"
              action={() => {
                history.push("/signup");
              }}
            />
          ) : null}
        </form>
      </div>
    </div>
  );
};
export default Login;
