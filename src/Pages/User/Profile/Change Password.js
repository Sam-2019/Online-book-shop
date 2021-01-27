import React from "react";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Message from "../../Components/Message";
import "./change.css";

const ChangePassword = ({ close }) => {
  return (
    <form className=" change ">
      <p>KenLay@enron-fraud.com</p>
      <Input class_name="input " placeholder="New Password" onChange />
      <Input class_name="input " placeholder="Confirm New Password" onChange />

      <Message class_name="message " message="Hello" />

      <Button class_name="primary" name="Update" />

      <Button class_name="secondary" name="Cancel" action={close} />
    </form>
  );
};

export default ChangePassword;
