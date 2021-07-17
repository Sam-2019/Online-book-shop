import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Input } from "../../Components/Input";
import Button from "../../Components/Button";
import Message from "../../Components/Message";

import { UPDATE_NAME, GET_USER } from "../../graphQL functions";

import "./change.css";

const ChangeName = ({ close }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const clear = () => {
    setFirstName("");
    setLastName("");
  };

  const [updateName, { loading, error, data }] = useMutation(UPDATE_NAME, {
    refetchQueries: [{ query: GET_USER }],
    onCompleted: (data) => {
      clear();
    },
  });

  const updateDetail = async (event) => {
    setMessage("");
    event.preventDefault();

    let empty = firstName && lastName;

    if (empty === "") {
      return setMessage("Please fill the form");
    }

    await updateName({
      variables: {
        firstName: String(firstName),
        lastName: String(lastName),
      },
    });
  };

  return (
    <form>
      <Input
        class_name="input "
        placeholder="First Name"
        value={firstName}
        action={(e) => setFirstName(e.target.value)}
        autocomplete="First Name"
      />
      <Input
        class_name="input "
        placeholder="Last Name"
        value={lastName}
        action={(e) => setLastName(e.target.value)}
        autocomplete="Last Name"
      />

      {message ? <Message message={message} class_name="message" /> : null}

      <Button
        class_name="primary"
        name="Update"
        action={updateDetail}
        loading={loading}
      />

      <Button class_name="secondary" name="Cancel" action={close} />
    </form>
  );
};

export default ChangeName;
