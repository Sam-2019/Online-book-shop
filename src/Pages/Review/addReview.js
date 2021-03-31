import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextArea } from "../Components/Input";
import Button from "../Components/Button";
import Message from "../Components/Message";
import StarRating from "../Components/StarRating";

const AddReview = ({ close }) => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  function submit(e) {
    e.preventDefault();

    if (text === "") {
      setMessage("Please fill the form");
    }

    if (text.length >= 50) {
      close();
    }
  }

  return (
    <form className=" change ">
      <StarRating />

      <TextArea
        class_name="text-input "
        placeholder="Leave a review"
        action={(e) => setText(e.target.value)}
        value={text}
      />

      {message ? <Message class_name="message " message={message} /> : null}

      <Button class_name="primary" name="Post" action={submit} />

      <Button class_name="secondary" name="Cancel" action={close} />
    </form>
  );
};

export default AddReview;

AddReview.propTypes = {
  close: PropTypes.func,
};
