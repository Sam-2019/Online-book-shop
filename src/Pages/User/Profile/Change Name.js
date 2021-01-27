import React from "react";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Message from "../../Components/Message";
import "./change.css";

const ChangeName = ({ close }) => {
  return (
    <form className=" change ">
      <Input class_name="input " placeholder="First Name" onChange />
      <Input class_name="input " placeholder="Last Name" onChange />

      <Message class_name="message " message="Hello" />


      <Button class_name="primary" name="Update" />

      <Button class_name="secondary" name="Cancel" action={close} />
    </form>
  );
};

export default ChangeName;
