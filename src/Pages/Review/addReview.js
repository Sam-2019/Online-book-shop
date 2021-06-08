import React, { useState } from "react";
import PropTypes from "prop-types";
import { gql, useMutation } from "@apollo/client";
import { TextArea } from "../Components/Input";
import Button from "../Components/Button";
import Message from "../Components/Message";
import StarRating from "../Components/StarRating";
import { useData } from "../Context";

const ADD_REVIEW = gql`
  mutation AddReview($user: ID!, $product: ID!, $rating: Int!, $text: String!) {
    addReview(user: $user, product: $product, rating: $rating, text: $text) {
      id
      user
      product
      rating
      text
    }
  }
`;

const AddReview = ({ close, user, product }) => {
  const { uniqueID } = useData();
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [starsSelected, setStarsSelected] = useState(0);

  const [
    addReview,
    { loading: reviewLoading, error: reviewError, data: reviewData },
  ] = useMutation(ADD_REVIEW);

  function submit(e) {
    e.preventDefault();

    if (text === "") {
      setMessage("Please fill the form");
    }

    addReview({
      variables: {
        user: String(uniqueID),
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
