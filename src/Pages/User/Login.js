import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import Back from "../Components/Back";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import Message from "../Components/Message";
import { EyeShow, EyeHide } from "../Components/Eye";
import { MediaQuery } from "../helper";
import { LOGIN } from "../graphQL functions";
import { useData } from "../Context";

import "./user.css";

const Login = () => {
  let history = useHistory();

  const breakpoint = 540;
  const { width } = MediaQuery();
  const { login } = useData();

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [show, hide] = useState("password");

  const [loginUser, { error, data }] = useLazyQuery(LOGIN);

  let type;

  switch (show) {
    case "text":
      type = "text";
      break;
    default:
      type = "password";
  }

  const clearLogin = () => {
    setEmail("");
    setPassword("");
  };

  const logIn = async (event) => {
    event.preventDefault();

    setMessage("");

    let empty = email && password;

    if (empty === "") {
      setMessage("Please fill the form");
    }

    if (empty !== "") {
      try {
        loginUser({ variables: { email, password } });

        console.log(data);

        if (data) {
          login(data);
          clearLogin();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

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
        </div>
      </div>

      <div className="main">
        <form className="form-wrapper login-box outline">
          <Input
            class_name="input "
            placeholder="Email"
            action={(e) => setEmail(e.target.value)}
            value={email}
            autocomplete="Email"
          />

          <Input
            class_name="input"
            placeholder="Password"
            type={type}
            action={(e) => setPassword(e.target.value)}
            value={password}
            autocomplete="Password"
          />

          <div className="eyeIcon">
            {show === "password" ? (
              <EyeHide
                action={() => {
                  hide("text");
                }}
              />
            ) : (
              <EyeShow
                action={() => {
                  hide("password");
                }}
              />
            )}
          </div>

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

          {message && <Message class_name="message " message={message} />}

          <Button
            name="Login"
            class_name="primary"
            action={logIn}
            loading={loading}
          />

          {width > breakpoint && (
            <Button
              name="Signup"
              class_name="secondary"
              action={() => {
                history.push("/signup");
              }}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
