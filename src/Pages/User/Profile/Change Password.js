import React, { useState } from "react";
import { useMutation } from "react-query";
import { Input } from "../../Components/Input";
import Button from "../../Components/Button";
import Message from "../../Components/Message";
import { EyeShow, EyeHide } from "../../Components/Eye";
import { userPasswordUpdate } from "../../endpoints";
import Data from "../../Data";
import "./change.css";

const ChangePassword = ({ close }) => {
  const { uniqueID, email } = Data();

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

  const mutation = useMutation((formData) => {
    return fetch(userPasswordUpdate, formData);
  });

  const reset = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const updatePassword = async (event) => {
    setMessage();
    event.preventDefault();
    var formData = new FormData();

    let empty = currentPassword && newPassword && confirmPassword;

    if (empty === "") {
      setMessage("Please fill the form");
    }

    if (empty !== "") {
      setLoading(true);
      formData.set("buyer_unique_id", uniqueID);
      formData.set("current_password", currentPassword);
      formData.set("new_password", newPassword);
      formData.set("confirm_password", confirmPassword);

      try {
        const data = await mutation.mutateAsync(formData);
        setMessage(data.message);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        reset();
      }
    }
  };

  return (
    <form className=" change ">
      <p>{email}</p>

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
