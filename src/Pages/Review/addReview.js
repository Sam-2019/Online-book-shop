import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { TextArea } from "../Components/Input";
import Button from "../Components/Button";
import Message from "../Components/Message";
import StarRating from "../Components/StarRating";
import { ADD_REVIEW } from "../graphQL functions";

const AddReview = ({ close, product, refetch }) => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [starsSelected, setStarsSelected] = useState(0);

  const [
    addReview,
    { error: reviewError },
  ] = useMutation(ADD_REVIEW, {
    onCompleted: (data) => {
      refetch();
    },
  });

  function submit(e) {
    e.preventDefault();

    if (text === "") {
      setMessage("Please fill the form");
    }

    addReview({
      variables: {
        product: String(product),
        rating: Number(starsSelected),
        text: String(text),
      },
    });

    if (reviewError) {
      setMessage(reviewError);
    }

    close();
  }

  return (
    <form>
      <StarRating
        starsSelected={starsSelected}
        setStarsSelected={setStarsSelected}
      />

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
