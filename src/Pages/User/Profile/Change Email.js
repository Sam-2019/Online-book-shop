import React from "react";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Message from "../../Components/Message";
import "./change.css";

const ChangeEmail = ({ close }) => {
  return (
    <form className=" change ">
      <Input class_name="input " placeholder="Current Email" onChange />
      <Input class_name="input " placeholder="New Email" onChange />

      <Message class_name="message " message="Hello" />

      <Button class_name="primary" name="Update" />

      <Button class_name="secondary" name="Cancel" action={close} />
    </form>
  );
};

export default ChangeEmail;
