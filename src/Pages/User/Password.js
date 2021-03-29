import React, { useState } from "react";
import Home from "../Components/Home";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { Input } from "../Components/Input";
import Button from "../Components/Button";
import Message from "../Components/Message";
import { EyeShow, EyeHide } from "../Components/Eye";
import { useData } from "../Context";
import { fetch } from "../helper";
import { userPasswordUpdate } from "../endpoints";
import "./user.css";

const Password = () => {
  let history = useHistory;
  const { email } = useData();

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

  const mutation = useMutation((formData) => {
    return fetch(userPasswordUpdate, formData);
  });

  const clear = () => {
    setNewPassword("");
    setConfirmPassword("");
  };

  const updatePassword = async (event) => {
    event.preventDefault();
    var formData = new FormData();

    setMessage("");

    let empty = newPassword && confirmPassword;

    if (empty === "") {
      setMessage("Please fill the form");
    }

    if (empty !== "") {
      setLoading(true);

      formData.set("buyer_unique_id", email);
      formData.set("new_password", newPassword);
      formData.set("confirm_password", confirmPassword);

      try {
        const data = await mutation.mutateAsync(formData);
        console.log(data);
        setMessage(data.message);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        clear();
        localStorage.removeItem("email");
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

          {/* <Button name="Signup" class_name="secondary" /> */}
        </form>
      </div>
    </div>
  );
};
export default Password;
