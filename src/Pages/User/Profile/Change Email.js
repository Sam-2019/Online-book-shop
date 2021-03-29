import React, { useState } from "react";
import { useMutation } from "react-query";
import { Input } from "../../Components/Input";
import Button from "../../Components/Button";
import Message from "../../Components/Message";
import Data from "../../Data";
import { userEmailUpdate } from "../../endpoints";
import { useData } from "../../Context";
import "./change.css";

const ChangeEmail = ({ close }) => {
  const { uniqueID } = useData();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [new_email, setNewEmail] = useState("");
  const [message, setMessage] = useState("");

  const reset = () => {
    setEmail("");
    setNewEmail("");
  };

  const mutation = useMutation((formData) => {
    return fetch(userEmailUpdate, formData);
  });

  const updateEmail = async (event) => {
    event.preventDefault();
    setMessage("");

    var formData = new FormData();

    let empty = email;

    if (empty === "") {
      setMessage("Please fill the form");
    }

    if (empty !== "") {
      setLoading(true);
      formData.set("buyer_unique_id", uniqueID);
      formData.set("email", email);

      try {
        const data = await mutation.mutateAsync(formData);
        setMessage(data.message);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        reset();
      }
    }
  };

  return (
    <form className=" change ">
      <Input
        class_name="input "
        placeholder="Current Email"
        value={email}
        action={(e) => setEmail(e.target.value)}
        autocomplete="Email"
      />
      <Input
        class_name="input "
        placeholder="New Email"
        value={new_email}
        action={(e) => setNewEmail(e.target.value)}
        autocomplete="New Email"
      />

      {message ? <Message message={message} class_name="message" /> : null}

      <Button
        class_name="primary"
        name="Update"
        action={updateEmail}
        loading={loading}
      />

      <Button class_name="secondary" name="Cancel" action={close} />
    </form>
  );
};

export default ChangeEmail;
