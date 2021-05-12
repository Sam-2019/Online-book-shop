import React, { useState } from "react";

import { Input } from "../../Components/Input";
import Button from "../../Components/Button";
import Message from "../../Components/Message";
import { EyeShow, EyeHide } from "../../Components/Eye";
import { userPasswordUpdate } from "../../endpoints";
import { fetch } from "../../helper";
import { useData } from "../../Context";
import "./change.css";

const ChangePassword = ({ close }) => {


  const [show, hide] = React.useState("password");

  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");


  let type;

  switch (show) {
    case "text":
      type = "text";
      break;
    default:
      type = "password";
  }

  const reset = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const updatePassword = async (event) => {
    setMessage();
    event.preventDefault();


    let empty = currentPassword && newPassword && confirmPassword;

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
        reset();

      }
    }
  };

  return (
    <form>
      <Input
        class_name="input "
        type={type}
        placeholder="Current Password"
        value={currentPassword}
        action={(e) => setCurrentPassword(e.target.value)}
        autocomplete="Current Password"
      />

      <div className="eyeIcon2">
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
        type={type}
        placeholder="New Password"
        value={newPassword}
        action={(e) => setNewPassword(e.target.value)}
        autocomplete="New Password"
      />

      <Input
        class_name="input "
        type={type}
        placeholder="Confirm New Password"
        value={confirmPassword}
        action={(e) => setConfirmPassword(e.target.value)}
        autocomplete="Confirm Password"
      />

      {message ? <Message message={message} class_name="message" /> : null}

      <Button
        class_name="primary"
        name="Update"
        action={updatePassword}
        loading={loading}
      />

      <Button class_name="secondary" name="Cancel" action={close} />
    </form>
  );
};

export default ChangePassword;
