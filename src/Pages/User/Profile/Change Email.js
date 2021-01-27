import React from "react";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import "./change.css";

const ChangeEmail = ({ close }) => {
  return (
    <form className=" change ">
      <Input class_name="input " placeholder="Current Email" onChange />
      <Input class_name="input " placeholder="New Email" onChange />

      <Button class_name="primary" name="Update" />

      <Button class_name="secondary" name="Cancel" action={close} />
    </form>
  );
};

export default ChangeEmail;
