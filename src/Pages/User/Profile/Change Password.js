import React from "react";
import { Input } from "../../Components/Input";
import Button from "../../Components/Button";
import Message from "../../Components/Message";
import { EyeShow, EyeHide } from "../../Components/Eye";
import "./change.css";

const ChangePassword = ({ close }) => {
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
    <form className=" change ">
      <p>KenLay@enron-fraud.com</p>

      <Input
        class_name="input "
        placeholder="New Password"
        type={type}
        onChange
      />

      <div className="eyeIcon2">
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
        type={type}
        placeholder="Confirm New Password"
        onChange
      />

      <Message class_name="message " message="Hello" />

      <Button class_name="primary" name="Update" />

      <Button class_name="secondary" name="Cancel" action={close} />
    </form>
  );
};

export default ChangePassword;
