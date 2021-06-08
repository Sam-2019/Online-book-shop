import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Input } from "../../Components/Input";
import Button from "../../Components/Button";
import Message from "../../Components/Message";

import { UPDATE_EMAIL } from "../../graphQL functions";
import { useData } from "../../Context";

import "./change.css";

const ChangeEmail = ({ close }) => {
  const [email, setEmail] = useState("");
  const [new_email, setNewEmail] = useState("");
  const [message, setMessage] = useState("");

  const { uniqueID } = useData();

  const [updateEmail, { loading, error, data }] = useMutation(UPDATE_EMAIL);

  const clear = () => {
    setEmail("");
    setNewEmail("");
  };

  const update = async (event) => {
    event.preventDefault();
    setMessage("");

    let empty = email & new_email;

    if (empty === "") {
      return setMessage("Please fill the form");
    }

    await updateEmail({
      variables: {
        id: String(uniqueID),
        email: String(email),
        new_email: String(new_email),
      },
    });

    if (loading === false) {
      clear();
    }
  };

  return (
    <form>
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
        action={update}
        loading={loading}
      />

      <Button class_name="secondary" name="Cancel" action={close} />
    </form>
  );
};

export default ChangeEmail;
