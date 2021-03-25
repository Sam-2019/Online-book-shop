import React, { useState } from "react";
import PropTypes from "prop-types";
import Back from "../Components/Back";
import { useHistory } from "react-router-dom";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import Message from "../Components/Message";
import { EyeShow, EyeHide } from "../Components/Eye";
import { useData } from "../Context";
import "./user.css";

const Password = () => {
  const { updateUserPassword, email } = useData();
  const [loading, setLoading] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [show, hide] = React.useState("password");

  let history = useHistory;
  let type;

  switch (show) {
    case "text":
      type = "text";
      break;
    default:
      type = "password";
  }

  const updatePassword = async (event) => {
    setMessage("");
    event.preventDefault();
    var formData = new FormData();

    let empty = newPassword && confirmPassword;

    if (empty !== "") {
      setLoading(true);
      formData.set("buyer_unique_id", email);
      formData.set("new_password", newPassword);
      formData.set("confirm_password", confirmPassword);

      const data = await updateUserPassword(formData);
      console.log(data);

      if (data.error === true) {
        setMessage(data.message);
        setError(data.error);
        setLoading(false);
      } else if (data.error === false) {
        setNewPassword("");
        setConfirmPassword("");
        localStorage.removeItem("email");
        setLoading(false);
      }
    } else if (empty === "") {
      setMessage("Please fill the form");
    } else return;
  };

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
            onChange
            type={type}
          />

          {message ? <Message class_name="message " message="Hello" /> : null}

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

          {/* <Button name="Signup" class_name="secondary" /> */}
        </form>
      </div>
    </div>
  );
};
export default Password;
