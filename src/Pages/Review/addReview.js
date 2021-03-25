import React from "react";
import { TextArea } from "../Components/Input";
import Button from "../Components/Button";
import Message from "../Components/Message";
import StarRating from '../Components/StarRating'

const AddReview = ({ close }) => {
  return (
    <form className=" change ">
    

      <StarRating  />

      <TextArea class_name="text-input " placeholder="Leave a review" onChange />

      <Button class_name="primary" name="Post" />

      <Button class_name="secondary" name="Cancel" action={close} />
    </form>
  );
};

export default AddReview;
