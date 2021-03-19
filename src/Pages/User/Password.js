import React from "react";
import PropTypes from "prop-types";
import Back from "../Components/Back";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import Message from "../Components/Message";
import { EyeShow, EyeHide } from "../Components/Eye";
import "./user.css";

const Password = () => {
  const [show, hide] = React.useState("password");

  let type;

  switch (show) {
    case "text":
      type = "text";
      break;
    default:
      type = "password";
  }

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
        <form className="form-wrapper   outline login -box">
          <Input
            class_name="input "
            placeholder="New Password"
            onChange
            type={type}
          />
          <div className="eyeIcon">
            {show === "password" ? (
                  <EyeHide
                action={() => {
                  hide("password");
                }}
              />
            ) : (
          <EyeShow
                action={() => {
                  hide("text");
                }}
              />
            )}
          </div>

          <Input
            class_name="input "
            placeholder="Confirm Password"
            onChange
            type={type}
          />

          <Message class_name="message " message="Hello" />

          <Button name="Submit" class_name="primary" />
          {/* <Button name="Signup" class_name="secondary" /> */}
        </form>
      </div>
    </div>
  );
};
export default Password;
