import React, { useState } from "react";
import Home from "../Components/Home";
import { useHistory } from "react-router-dom";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import Message from "../Components/Message";
import { EyeShow, EyeHide } from "../Components/Eye";

import "./user.css";

const Password = () => {
  let history = useHistory;

  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [show, hide] = React.useState("password");

  let type;

  switch (show) {
    case "text":
      type = "text";
      break;
    default:
      type = "password";
  }

  const clear = () => {
    setNewPassword("");
    setConfirmPassword("");
  };

  const updatePassword = async (event) => {
    event.preventDefault();

    setMessage("");

    let empty = newPassword && confirmPassword;

    if (empty === "") {
      setMessage("Please fill the form");
    }

    if (empty !== "") {
      setLoading(true);

      try {
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        clear();
      }
    }
  };

  return (
    <div className="user-wrapper">
      <div className="header ">
        <div className="category ">
          <div className="object-1">
            <Home width={30} height={30} />
          </div>
          <div className="object-2"> New Password</div>
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
        </div>
      </div>

      <div className="main">
        <form className="form-wrapper   login-box outline">
          <Input
            class_name="input "
            placeholder="New Password"
            type={type}
            value={newPassword}
            action={(e) => setNewPassword(e.target.value)}
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

          <Input
            class_name="input "
            placeholder="Confirm Password"
            type={type}
            value={confirmPassword}
            action={(e) => setConfirmPassword(e.target.value)}
          />

          {message ? <Message class_name="message " message={message} /> : null}

          {error ? (
            <Button
              name="Login"
              action={() => {
                history.push("/login");
              }}
              class_name="primary"
            />
          ) : (
            <Button
              name="Submit"
              class_name="primary"
              action={updatePassword}
              loading={loading}
            />
          )}
        </form>
      </div>
    </div>
  );
};
export default Password;
