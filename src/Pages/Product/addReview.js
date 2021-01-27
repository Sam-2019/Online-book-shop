import React from "react";
import { TextArea } from "../Components/Input";
import Button from "../Components/Button";
import Message from "../Components/Message";

const AddReview = ({ close }) => {
  return (
    <form className=" change ">
      <TextArea class_name="input " placeholder="User Review" onChange />

      <Message class_name="message " message="Hello" />

      <Button class_name="primary" name="Post" />

      <Button class_name="secondary" name="Cancel" action={close} />
    </form>
  );
};

export default AddReview;
