import React, { useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import Back from "../Components/Back";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import Message from "../Components/Message";
import { EyeShow, EyeHide } from "../Components/Eye";
import { MediaQuery, fetch } from "../helper";
import { userLogin } from "../endpoints";
import { useData } from "../Context";
import "./user.css";

const Login = () => {
  let history = useHistory();
  const { isLoggedIn } = useData();

  const breakpoint = 540;
  const { width } = MediaQuery();

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [show, hide] = useState("password");

  let type;

  switch (show) {
    case "text":
      type = "text";
      break;
    default:
      type = "password";
  }

  // const mutation = useMutation((formData) => {
  //   return loginUser(formData);
  // });

  const mutation = useMutation((formData) => {
    return fetch(userLogin, formData);
  });

  const clearLogin = () => {
    setEmail("");
    setPassword("");
  };

  const logIn = async (event) => {
    event.preventDefault();
      var formData = new FormData();

    setMessage("");

    let empty = email && password;

    if (empty === "") {
      setMessage("Please fill the form");
    }

    if (empty !== "") {
      setLoading(true);

      formData.set("email", email);
      formData.set("password", password);

      try {
        const data = await mutation.mutateAsync(formData);
        console.log(data);
        setMessage(data.message);
        localStorage.setItem("loginToken", data.token);
        await isLoggedIn();
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        clearLogin();
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

          {message ? <Message class_name="message " message={message} /> : null}

          <Button
            name="Login"
            class_name="primary"
            action={logIn}
            loading={loading}
          />

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
