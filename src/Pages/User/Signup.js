import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Back from "../Components/Back";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import { EyeShow, EyeHide } from "../Components/Eye";
import Home from "../Components/Home";
import Message from "../Components/Message";
import { MediaQuery } from "../helper";
import "./user.css";

const Signup = () => {
  let history = useHistory();
  const breakpoint = 540;
  const { width } = MediaQuery();

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
      <div className="header">
        <div className="category ">
          <div className="object-1">
            <Back width={30} height={30} />
          </div>
          <div className="object-2"> Create account</div>
        </div>

        <div className="category ">
          <div className="object-2">
            <Button
              name="Login"
              class_name="header-secondary"
              action={() => {
                history.push("/login");
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
          <Input
            class_name="input "
            placeholder="Name "
            onChange
            autoComplete="name"
          />
          <Input
            class_name="input "
            placeholder="Email"
            onChange
            autoComplete="email"
          />
          <div className="eyeLiner">
            <Input
              class_name="password"
              placeholder="Password"
              onChange
              autoComplete="new-password"
              type={type}
            />
            {show === "password" ? (
              <EyeShow
                action={() => {
                  hide("text");
                }}
              />
            ) : (
              <EyeHide
                action={() => {
                  hide("password");
                }}
              />
            )}
          </div>

          <Input
            class_name="input "
            placeholder="Confirm Password"
            onChange
            autoComplete="new-password"
            type={type}
          />

          {/* <Input
            type="date"
            class_name="input "
            placeholder="Date of birth"
            onChange
          /> */}

          <Message class_name="message " message="Hello" />

          <Button name="Signup" class_name=" primary" />

          {width > breakpoint ? (
            <Button
              name="Login"
              class_name="secondary "
              action={() => {
                history.push("/login");
              }}
            />
          ) : null}
        </form>
      </div>
    </div>
  );
};
export default Signup;
