import React from "react";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import "./changepassword.css";

const ChangePassword = ({ close }) => {
  return (
    <form className=" change-password ">
      <Input class_name="input " placeholder="Location" onChange />
      <Input class_name="input " placeholder="New Password" onChange />
      <Input class_name="input " placeholder="Confirm New Password" onChange />

      <Button class_name="primary" name="Update" />

      <Button class_name="secondary" name="Cancel" action={close} />
    </form>
  );
};

export default ChangePassword;
