import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Input } from "../../Components/Input";
import Button from "../../Components/Button";
import Message from "../../Components/Message";
import { EyeShow, EyeHide } from "../../Components/Eye";
import { useData } from "../../Context";
import "./change.css";
import { UPDATE_PASSWORD } from "../../graphQL functions";

const ChangePassword = ({ close }) => {
  const [show, hide] = React.useState("password");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const { uniqueID } = useData();

  const [updatePassword, { loading, error, data }] =
    useMutation(UPDATE_PASSWORD);

  let type;

  switch (show) {
    case "text":
      type = "text";
      break;
    default:
      type = "password";
  }

  const clear = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const update = async (event) => {
    setMessage("");
    event.preventDefault();

    let empty = currentPassword && newPassword && confirmPassword;

    if (empty === "") {
      return setMessage("Please fill the form");
    }

    if (newPassword !== confirmPassword) {
      return setMessage("Password mismatch");
    }

    if (newPassword === confirmPassword) {
      await updatePassword({
        variables: {
          id: String(uniqueID),
          password: String(currentPassword),
          new_password: String(newPassword),
          confirm_password: String(confirmPassword),
        },
      });

      if (loading === false) {
        clear();
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
        action={update}
        loading={loading}
      />

      <Button class_name="secondary" name="Cancel" action={close} />
    </form>
  );
};

export default ChangePassword;
